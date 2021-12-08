import type PowerSchoolAPI from "../index";
import { getStudentDataResponse, QueryIncludeListVO, UserSessionVO } from "../types";
import Assignment from "./Assignment";
import AssignmentCategory from "./AssignmentCategory";
import AssignmentScore from "./AssignmentScore";
import AttendanceCode from "./AttendanceCode";
import AttendanceRecord from "./AttendanceRecord";
import Course from "./Course";
import Event from "./Event";
import FinalGrade from "./FinalGrade";
import Period from "./Period";
import ReportingTerm from "./ReportingTerm";
import School from "./School";
import Student from "./Student";
import StudentInfo from "./StudentInfo";
import Teacher from "./Teacher";
import Term from "./Term";
import UserSession from "./UserSession";

/**
 * A PowerSchool API user, which holds information about the user and methods to interact with them.
 */
export default class User {
	/**
	 * The PowerSchool API.
	 */
	public declare api: PowerSchoolAPI;

	/**
	 * The raw response of the `getStudentData` API call.
	 */
	public declare rawResult: getStudentDataResponse | null;

	/**
	 * The user's session.
	 */
	public declare session: UserSession;

	/**
	 * Cached student data. Only populated if {@link getStudentsInfo} is called.
	 */
	public declare studentData: StudentInfo[];

	/**
	 * The user's ID.
	 */
	public declare userID: number;

	/**
	 * The user's type.
	 */
	public declare userType: number;

	/**
	 * @internal
	 */
	constructor(sessionData: UserSessionVO, api: PowerSchoolAPI) {
		this.session = sessionData != null ? UserSession.fromData(sessionData) : null!;
		this.api = api ?? null;
		this.userID = this.session.userID ?? null;
		this.userType = this.session.userType ?? null;
		// We need to fetch these separately
		this.studentData = [];
		this.rawResult = null;
	}

	/**
	 * Get information about this account's student(s).
	 * @return A promise that resolves with the account's students information, and rejects with an Error if one occurred.
	 */
	public getStudentsInfo(): Promise<StudentInfo[]> {
		return new Promise((resolve, reject) => {
			const data = {
				userSessionVO: {
					userId: this.userID,
					serviceTicket: this.session.serviceTicket,
					serverInfo: {
						apiVersion: this.session.serverInfo!.apiVersion,
					},
					// For some reason it provides it in a different format than it provides (wants ISO 8601)
					serverCurrentTime:
						this.session.serverCurrentTime != null ? new Date(this.session.serverCurrentTime).toISOString() : null,
					userType: this.userType,
				},
				studentIDs: this.session.studentIDs,
				qil: {
					includes: 1,
				},
			} as { userSessionVO: UserSessionVO | null; studentIDs: number | number[]; qil: QueryIncludeListVO | null };
			this.api.client.getStudentData(
				data,
				(err, result) => {
					if (!result || !result.return || !result.return.studentDataVOs) return reject(err);
					this.rawResult = result;
					this.studentData = this._parseStudentInfoResult(result);
					resolve(this.studentData);
				},
				this.api.requestOptions
			);
		});
	}

	/**
	 * Get the information about the first student on the account.
	 *
	 * @deprecated Use `getStudentInfo()` to better support multi-user accounts.
	 * @return A promise that resolves with the user's student info, and rejects with an Error if one occurred.
	 */
	public async getStudentInfo(): Promise<StudentInfo> {
		return (await this.getStudentsInfo())[0];
	}

	/**
	 * Parses the raw student data and converts it into the custom classes.
	 * @param result The raw student data.
	 * @return The parsed student data.
	 */
	private _parseStudentInfoResult(result: getStudentDataResponse) {
		const parsed: StudentInfo[] = [];
		const studentsData = parseArray(result.return!.studentDataVOs);

		for (let [, data] of studentsData.entries()) {
			const studentData = new StudentInfo();
			const notNull = <Data>(data: Data): Data extends null ? never : Data => data as any;
			data = notNull(data);

			const cache = this.api._cachedInfo,
				// Deserialize any data we might need for special types
				schools = parseArray(data.schools).map((data) => School.fromData(data!, cache)), // for some reason sometimes is an array, sometimes is one school.
				teachers = parseArray(data.teachers).map((data) => Teacher.fromData(data!)),
				terms = parseArray(data.terms).map((data) => Term.fromData(data!, cache)),
				reportingTerms = parseArray(data.reportingTerms).map((data) => ReportingTerm.fromData(data!, cache)),
				assignments = parseArray(data.assignments).map((data) => Assignment.fromData(data!, cache)),
				assignmentScores = parseArray(data.assignmentScores).map((data) => AssignmentScore.fromData(data!, cache)),
				attendanceCodes = parseArray(data.attendanceCodes).map((data) => AttendanceCode.fromData(data!, cache)),
				periods = parseArray(data.periods).map((data) => Period.fromData(data!, cache)),
				courses = parseArray(data.sections).map((data) => Course.fromData(data!, cache)),
				finalGrades = parseArray(data.finalGrades).map((data) => FinalGrade.fromData(data!, cache));

			// Add assignments to their categories
			const assignmentCategories: Record<string, AssignmentCategory> = {};
			parseArray(data.assignmentCategories).forEach(
				(data) => (assignmentCategories[data!.id] = AssignmentCategory.fromData(data!, cache))
			);
			assignments
				.filter((a) => assignmentCategories[a.categoryID])
				.forEach((a) => assignmentCategories[a.categoryID].assignments.push(a));

			// Store information needed for other data mappings
			this.api.storeCacheInfo(teachers, "teachers", "id");
			this.api.storeCacheInfo(schools, "schools", "schoolNumber");
			this.api.storeCacheInfo(periods, "periods", "id");
			this.api.storeCacheInfo(courses, "courses", "id");
			this.api.storeCacheInfo(finalGrades, "finalGrades", "courseID");
			this.api.storeCacheInfo(terms, "terms", "id");
			this.api.storeCacheInfo(reportingTerms, "reportingTerms", "id");
			this.api.storeCacheInfo(Object.values(assignmentCategories), "assignmentCategories", "id");
			this.api.storeCacheInfo(assignments, "assignments", "id");
			this.api.storeCacheInfo(assignmentScores, "assignmentScores", "assignmentID");
			this.api.storeCacheInfo(attendanceCodes, "attendanceCodes", "id");

			// Store the rest of the data for use in the student model
			studentData.schools = schools;
			studentData.teachers = teachers;
			studentData.periods = periods;
			studentData.courses = courses;
			studentData.terms = terms;
			studentData.reportingTerms = reportingTerms;
			studentData.notInSessionDays = parseArray(data.notInSessionDays).map((data) =>
				Event.fromData(data!, this.api._cachedInfo)
			);
			studentData.student = Student.fromData(data.student!, this.api._cachedInfo);
			studentData.yearID = data.yearId;
			studentData.assignmentCategories = Object.values(assignmentCategories);
			studentData.attendanceRecords = parseArray(data.attendance).map((data) =>
				AttendanceRecord.fromData(data!, this.api._cachedInfo)
			);
			studentData.attendanceCodes = attendanceCodes;
			studentData.finalGrades = finalGrades;

			parsed.push(studentData);
		}

		return parsed;
	}
}

/**
 * Safely parse an unpredictable array. Sometimes arrays are not actually arrays.
 * @param arr The data to make sure is an array.
 */
export function parseArray<T>(arr: T | T[]): T extends null ? never : T[] {
	if (!arr) return [] as unknown as T extends null ? never : T[];
	if (Array.isArray(arr)) return arr as unknown as T extends null ? never : T[];
	return [arr] as unknown as T extends null ? never : T[];
}
