import { createClient } from "soap";
import Assignment from "./models/Assignment.js";
import AssignmentCategory from "./models/AssignmentCategory.js";
import AssignmentScore from "./models/AssignmentScore.js";
import AttendanceCode from "./models/AttendanceCode.js";
import Course from "./models/Course.js";
import FinalGrade from "./models/FinalGrade.js";
import Period from "./models/Period.js";
import ReportingTerm from "./models/ReportingTerm.js";
import School from "./models/School.js";
import Teacher from "./models/Teacher.js";
import Term from "./models/Term.js";
import User from "./models/User.js";
import type { PublicPortalServiceJSONClient } from "./types.js";

/**
 * The main PowerSchool API wrapper, for logging into user accounts and caching of retrieved info.
 */
export default class PowerSchoolAPI {
	/**
	 * Cached user data.
	 */
	declare _cachedInfo: CacheInfo;

	/**
	 * The password used to connect to the PowerSchool API.
	 */
	public declare apiPassword: string;

	/**
	 * The username used to connect to the PowerSchool API.
	 */
	public declare apiUsername: string;

	/**
	 * The client used to connect to the PowerSchool API.
	 */
	public declare client: PublicPortalServiceJSONClient;

	/**
	 * Whether or not the client has errored.
	 */
	public declare errored: boolean;

	/**
	 * Whether or not the client is ready to use.
	 */
	public declare ready: boolean;

	/**
	 * The options used to connect to the PowerSchool API.
	 */
	public declare requestOptions: { auth: { user: string; pass: string; sendImmediately: boolean } };

	/**
	 * The url used to connect to the PowerSchool API.
	 */
	public declare url: string;

	/**
	 * Create an API wrapper.
	 * @param url - The main URL of the PowerSchool installation, such as "http://sales.powerschool.com".
	 * @param apiUsername - The API username to use for logging in, if your installation has a different one. For most installations, the default provided value should work.
	 * @param apiPassword - The API password to use for logging in, if your installation has a different one. For most installations, the default provided value should work.
	 */
	public constructor(url: string, apiUsername: string = "pearson", apiPassword: string = "m0bApP5") {
		this.url = url;
		this.apiUsername = apiUsername;
		this.apiPassword = apiPassword;
		this.ready = false;
		this.errored = false;
		this.requestOptions = { auth: { user: apiUsername, pass: apiPassword, sendImmediately: false } };
		this._cachedInfo = {} as CacheInfo;
	}

	/**
	 * Setup the API wrapper for usage (required for any interaction).
	 * @return A promise that returns the API again if resolved, or an Error if rejected.
	 */
	public setup(): Promise<PowerSchoolAPI> {
		const publicPortalServiceURL = this.url + "/pearson-rest/services/PublicPortalServiceJSON";
		return new Promise((resolve, reject) => {
			createClient(
				publicPortalServiceURL + "?wsdl",
				{
					wsdl_options: this.requestOptions,
				},
				(err, client) => {
					if (!client) {
						this.errored = true;
						return reject(err);
					}

					this.ready = true;
					client.setEndpoint(publicPortalServiceURL);
					this.client = client as PublicPortalServiceJSONClient;
					resolve(this);
				}
			);
		});
	}

	/**
	 * Log into a user's account and get their user object.
	 * @param username - The username of the account to log in to.
	 * @param password - The password of the account to log in to.
	 * @return A promise that resolves with the user if login was successful, resolves to null if invalid credentials were provided, and rejects with an Error if another error occurred during login.
	 */
	public login(username: string, password: string): Promise<User | null> {
		return new Promise((resolve, reject) => {
			if (!this.ready) reject(null);
			this.client.loginToPublicPortal(
				{ username: username, password: password },
				(err, result) => {
					if (!result || !result.return) return reject(err);
					if (!result.return.userSessionVO) return resolve(null);
					const user = new User(result.return.userSessionVO, this);
					resolve(user);
				},
				this.requestOptions
			);
		});
	}

	/**
	 * Store a piece of information in the cache.
	 * @internal
	 */
	public storeCacheInfo<T extends keyof ArrayTypeMap>(dataArray: ArrayTypeMap[T][], dataType: T, idKey: IdTypeMap[T]) {
		if (!Array.isArray(dataArray)) dataArray = [dataArray];
		if (!this._cachedInfo[dataType]) this._cachedInfo[dataType] = {};
		dataArray.forEach(
			(item) =>
				(this._cachedInfo[dataType][
					item[
						idKey as Exclude<
							| keyof typeof AssignmentCategory
							| keyof typeof Assignment
							| keyof typeof AssignmentScore
							| keyof typeof AttendanceCode
							| keyof typeof Course
							| keyof typeof FinalGrade
							| keyof typeof Period
							| keyof typeof ReportingTerm
							| keyof typeof School
							| keyof typeof Teacher
							| keyof typeof Term,
							"prototype" | "fromData"
						>
					]
				] = item)
		);
	}
}

/**
 * Cached user data.
 */
export type CacheInfo = {
	assignmentCategories: { [id: number]: AssignmentCategory };
	assignments: { [id: number]: Assignment };
	assignmentScores: { [assignmentID: number]: AssignmentScore };
	attendanceCodes: { [id: number]: AttendanceCode };
	courses: { [id: number]: Course };
	finalGrades: { [courseID: number]: FinalGrade };
	periods: { [id: number]: Period };
	reportingTerms: { [id: number]: ReportingTerm };
	schools: { [schoolNumber: number]: School };
	teachers: { [id: number]: Teacher };
	terms: { [id: number]: Term };
};

/**
 * @internal
 */
type ArrayTypeMap = {
	assignmentCategories: AssignmentCategory;
	assignments: Assignment;
	assignmentScores: AssignmentScore;
	attendanceCodes: AttendanceCode;
	courses: Course;
	finalGrades: FinalGrade;
	periods: Period;
	reportingTerms: ReportingTerm;
	schools: School;
	teachers: Teacher;
	terms: Term;
};

/**
 * @internal
 */
type IdTypeMap = {
	assignmentCategories: "id";
	assignments: "id";
	assignmentScores: "assignmentID";
	attendanceCodes: "id";
	courses: "id";
	finalGrades: "courseID";
	periods: "id";
	reportingTerms: "id";
	schools: "schoolNumber";
	teachers: "id";
	terms: "id";
};
