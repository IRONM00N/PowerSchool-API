import "source-map-support/register";
import { createClient } from "soap";
import User from "./models/User";
import { PublicPortalServiceJSONClient } from "./types";
import "request";
import Teacher from "./models/Teacher";
import Period from "./models/Period";
import School from "./models/School";
import Course from "./models/Course";
import FinalGrade from "./models/FinalGrade";
import Term from "./models/Term";
import ReportingTerm from "./models/ReportingTerm";
import Assignment from "./models/Assignment";
import AssignmentScore from "./models/AssignmentScore";
import AttendanceCode from "./models/AttendanceCode";
import AssignmentCategory from "./models/AssignmentCategory";

/**
 * The main PowerSchool API wrapper, for logging into user accounts and caching of retrieved info.
 */
export default class PowerSchoolAPI {
	public declare url: string;
	public declare apiUsername: string;
	public declare apiPassword: string;
	public declare ready: boolean;
	public declare errored: boolean;
	public declare requestOptions: { auth: { user: string; pass: string; sendImmediately: boolean } };
	declare _cachedInfo: Cache;
	public declare client: PublicPortalServiceJSONClient;

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
		this._cachedInfo = {} as Cache;
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
					request: require("request").defaults(this.requestOptions)
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
	 * @internal
	 */
	public storeCacheInfo<T extends keyof ArrayTypeMap>(dataArray: ArrayTypeMap[T][], dataType: T, idKey: IdTypeMap[T]) {
		if (!Array.isArray(dataArray)) dataArray = [dataArray];
		if (!this._cachedInfo[dataType]) this._cachedInfo[dataType] = {};
		dataArray.forEach(
			(item) =>
				(this._cachedInfo[dataType][item[idKey as keyof ArrayTypeMap[T]] as unknown as keyof typeof Cache] = item)
		);
	}
}

type Cache = {
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