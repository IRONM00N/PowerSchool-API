import Event from "./Event";
import Term from "./Term";
import Period from "./Period";
import ReportingTerm from "./ReportingTerm";
import Course from "./Course";
import Student from "./Student";
import StudentInfo from "./StudentInfo";
import School from "./School";
import Teacher from "./Teacher";
import Assignment from "./Assignment";
import AssignmentScore from "./AssignmentScore";
import AssignmentCategory from "./AssignmentCategory";
import AttendanceRecord from "./AttendanceRecord";
import AttendanceCode from "./AttendanceCode";
import FinalGrade from "./FinalGrade";
import type PowerSchoolAPI from "../index";
import { getStudentDataResponse, QueryIncludeListVO, StudentDataVO, UserSessionVO } from "../types";

/**
 * A PowerSchool API user, which holds information about the user and methods to interact with them.
 */
export default class User {
	declare api: PowerSchoolAPI;
	declare session: UserSessionVO;
	declare userID: number;
	declare userType: number;
	declare studentData: StudentInfo[];
	declare rawResult: getStudentDataResponse | null;

	constructor(session: UserSessionVO, api: PowerSchoolAPI) {
		this.session = session ?? null;
		if (this.session.serverCurrentTime) {
			// For some reason it provides it in a different format than it provides (wants ISO 8601)
			this.session.serverCurrentTime = new Date(this.session.serverCurrentTime).toISOString();
		}
		this.api = api ?? null;
		this._initUserVariables();
	}

	private _initUserVariables() {
		this.userID = this.session.userId ?? null;
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
						apiVersion: this.session.serverInfo!.apiVersion
					},
					serverCurrentTime: this.session.serverCurrentTime,
					userType: this.userType
				},
				studentIDs: this.session.studentIDs,
				qil: {
					includes: 1
				}
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

	private _parseStudentInfoResult(result: getStudentDataResponse) {
		const parsed: StudentInfo[] = [];
		const studentsData = this.safelyParseUnpredictableArray(result.return!.studentDataVOs);

		studentsData.forEach((data, i) => {
			const studentData = new StudentInfo();
			const notNull = <Data>(data: Data): Data extends null ? never : Data => data as any;
			data = notNull(data);

			// Deserialize any data we might need for special types
			const schools = this.safelyParseUnpredictableArray(data.schools).map((data, j) => {
				/* if (i === 0 && j === 0) {
					console.log("schools");
					console.dir(data);
				} */
				return School.fromData(data!, this.api);
			}); // for some reason sometimes is an array, sometimes is one school.
			const teachers = this.safelyParseUnpredictableArray(data.teachers).map((data, j) => {
				/* if (i === 0 && j === 0) {
					console.log("teachers");
					console.dir(data);
				} */
				return Teacher.fromData(data!);
			});
			const terms = this.safelyParseUnpredictableArray(data.terms).map((data, j) => {
				/* if (i === 0 && j === 0) {
					console.log("terms");
					console.dir(data);
				} */
				return Term.fromData(data!, this.api);
			});
			const reportingTerms = this.safelyParseUnpredictableArray(data.reportingTerms).map((data, j) => {
				/* if (i === 0 && j === 0) {
					console.log("reportingTerms");
					console.dir(data);
				} */
				return ReportingTerm.fromData(data!, this.api);
			});
			const assignments = this.safelyParseUnpredictableArray(data.assignments).map((data, j) => {
				/* if (i === 0 && j === 0) {
					console.log("assignments");
					console.dir(data);
				} */
				return Assignment.fromData(data!, this.api);
			});
			const assignmentScores = this.safelyParseUnpredictableArray(data.assignmentScores).map((data, j) => {
				/* if (i === 0 && j === 0) {
					console.log("assignmentScores");
					console.dir(data);
				} */
				return AssignmentScore.fromData(data!, this.api);
			});
			const attendanceCodes = this.safelyParseUnpredictableArray(data.attendanceCodes).map((data, j) => {
				/* if (i === 0 && j === 0) {
					console.log("attendanceCodes");
					console.dir(data);
				} */
				return AttendanceCode.fromData(data!, this.api);
			});
			const periods = this.safelyParseUnpredictableArray(data.periods).map((data, j) => {
				/* if (i === 0 && j === 0) {
					console.log("periods");
					console.dir(data);
				} */
				return Period.fromData(data!, this.api);
			});
			const courses = this.safelyParseUnpredictableArray(data.sections).map((data, j) => {
				/* if (i === 0 && j === 0) {
					console.log("sections");
					console.dir(data);
				} */
				return Course.fromData(data!, this.api);
			});
			const finalGrades = this.safelyParseUnpredictableArray(data.finalGrades).map((data, j) => {
				/* if (i === 0 && j === 0) {
					console.log("finalGrades");
					console.dir(data);
				} */
				return FinalGrade.fromData(data!, this.api);
			});

			// Add assignments to their categories
			const assignmentCategories: Record<string, AssignmentCategory> = {};
			this.safelyParseUnpredictableArray(data.assignmentCategories).forEach(
				(data) => (assignmentCategories[data!.id] = AssignmentCategory.fromData(data!, this.api))
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
			studentData.notInSessionDays = this.safelyParseUnpredictableArray(data.notInSessionDays).map((data) =>
				Event.fromData(data!, this.api)
			);
			studentData.student = Student.fromData(data.student!, this.api);
			studentData.yearID = data.yearId;
			studentData.assignmentCategories = Object.values(assignmentCategories);
			studentData.attendanceRecords = this.safelyParseUnpredictableArray(data.attendance).map((data) =>
				AttendanceRecord.fromData(data!, this.api)
			);
			studentData.attendanceCodes = attendanceCodes;
			studentData.finalGrades = finalGrades;

			parsed.push(studentData);
		});

		return parsed;
	}

	private safelyParseUnpredictableArray<T>(arr: T | T[]): T[] {
		if (!arr) return [];
		if (Array.isArray(arr)) return arr;
		return [arr];
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
}
