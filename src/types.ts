import { CoreOptions } from "request";
import { Client } from "soap";

export function parseLong<T extends long | null>(long: T): T extends null ? null : number {
	return typeof long != null ? Number(long) : (null as any);
}

export function parseDate<T extends Date | null>(date: T): T extends null ? null : Date {
	return typeof date != null ? new Date(date as any) : (null as any);
}

type Cb<T> = (error: Error, result: T, rawResponse: unknown, soapHeader: unknown, rawRequest: unknown) => any;
type Options = CoreOptions;
type base64Binary = string;
export type int = number;
// type long = string; // node-soap makes longs a string
export type long = number;
export type double = number;
export type decimal = number;

export interface PublicPortalServiceJSONClient extends Client {
	getCredentialComplexityRules(
		args: getCredentialComplexityRulesArgs,
		callback: Cb<getCredentialComplexityRulesResponse>,
		options: Options
	): void;
	getCredentialComplexityRulesAsync(
		args: getCredentialComplexityRulesArgs,
		options: Options
	): Promise<getCredentialComplexityRulesResponse>;

	logoutAndDelinkDeviceToken(
		args: logoutAndDelinkDeviceTokenArgs,
		callback: Cb<logoutAndDelinkDeviceTokenResponse>,
		options: Options
	): void;
	logoutAndDelinkDeviceTokenAsync(
		args: logoutAndDelinkDeviceTokenArgs,
		options: Options
	): Promise<logoutAndDelinkDeviceTokenResponse>;

	login(args: loginArgs, callback: Cb<loginResponse>, options: Options): void;
	loginAsync(args: loginArgs, options: Options): loginResponse;

	getStudentData(args: getStudentDataArgs, callback: Cb<getStudentDataResponse>, options: Options): void;
	getStudentDataAsync(args: getStudentDataArgs, options: Options): Promise<getStudentDataResponse>;

	sendPasswordRecoveryEmail(
		args: sendPasswordRecoveryEmailArgs,
		callback: Cb<sendPasswordRecoveryEmailResponse>,
		options: Options
	): void;
	sendPasswordRecoveryEmailAsync(
		args: sendPasswordRecoveryEmailArgs,
		options: Options
	): Promise<sendPasswordRecoveryEmailResponse>;

	logout(args: logoutArgs, callback: Cb<logoutResponse>, options: Options): void;
	logoutAsync(args: logoutArgs, options: Options): Promise<logoutResponse>;

	loginToPublicPortal(args: loginToPublicPortalArgs, callback: Cb<loginToPublicPortalResponse>, options: Options): void;
	loginToPublicPortalAsync(args: loginToPublicPortalArgs, options: Options): Promise<loginToPublicPortalResponse>;

	linkDeviceTokenToUser(
		args: linkDeviceTokenToUserArgs,
		callback: Cb<linkDeviceTokenToUserResponse>,
		options: Options
	): void;
	linkDeviceTokenToUserAsync(args: linkDeviceTokenToUserArgs, options: Options): Promise<linkDeviceTokenToUserResponse>;

	recoverUsername(args: recoverUsernameArgs, callback: Cb<recoverUsernameResponse>, options: Options): void;
	recoverUsernameAsync(args: recoverUsernameArgs, options: Options): Promise<recoverUsernameResponse>;

	getStudentPhoto(args: getStudentPhotoArgs, callback: Cb<getStudentPhotoResponse>, options: Options): void;
	getStudentPhotoAsync(args: getStudentPhotoArgs, options: Options): Promise<getStudentPhotoResponse>;

	recoverPassword(args: recoverPasswordArgs, callback: Cb<recoverPasswordResponse>, options: Options): void;
	recoverPasswordAsync(args: recoverPasswordArgs, options: Options): Promise<recoverPasswordResponse>;

	getSchoolMapBySchoolNumber(
		args: getSchoolMapBySchoolNumberArgs,
		callback: Cb<getSchoolMapBySchoolNumberResponse>,
		options: Options
	): void;
	getSchoolMapBySchoolNumberAsync(
		args: getSchoolMapBySchoolNumberArgs,
		options: Options
	): Promise<getSchoolMapBySchoolNumberResponse>;

	storeNotificationSettings(
		args: storeNotificationSettingsArgs,
		callback: Cb<storeNotificationSettingsResponse>,
		options: Options
	): void;
	storeNotificationSettingsAsync(
		args: storeNotificationSettingsArgs,
		options: Options
	): Promise<storeNotificationSettingsResponse>;

	getStartStopTimeForAllSections(
		args: getStartStopTimeForAllSectionsResponse,
		callback: Cb<getStartStopTimeForAllSectionsResponse>,
		options: Options
	): void;
	getStartStopTimeForAllSectionsAsync(
		args: getStartStopTimeForAllSectionsResponse,
		options: Options
	): Promise<getStartStopTimeForAllSectionsResponse>;
}

export interface getCredentialComplexityRulesArgs {
	userType: int;
}

export interface getCredentialComplexityRulesResponse {
	return: CredentialComplexityRulesVO | null;
}

export interface logoutAndDelinkDeviceTokenArgs {
	userSessionVO: UserSessionVO | null;
	deviceToken: string | null;
}

export interface logoutAndDelinkDeviceTokenResponse {
	return: ResultsVO | null;
}

export interface loginArgs {
	username: string | null;
	password: string | null;
	userType: int;
}

export interface loginResponse {
	return: ResultsVO | null;
}

export interface getStudentDataArgs {
	userSessionVO: UserSessionVO | null;
	studentIDs: long | long[];
	qil: QueryIncludeListVO | null;
}

export interface getStudentDataResponse {
	return: ResultsVO | null;
}

export interface sendPasswordRecoveryEmailArgs {
	userType: int;
	userName: string | null;
	emailAddress: string | null;
}

export interface sendPasswordRecoveryEmailArgs {}

export interface sendPasswordRecoveryEmailResponse {
	return: MessageVO | null;
}

export interface logoutArgs {
	userSessionVO: UserSessionVO | null;
}

export interface logoutResponse {
	return: ResultsVO | null;
}

export interface loginToPublicPortalArgs {
	username: string | null;
	password: string | null;
}

export interface loginToPublicPortalResponse {
	return: ResultsVO | null;
}

export interface linkDeviceTokenToUserArgs {
	userSessionVO: UserSessionVO | null;
	deviceToken: string | null;
}

export interface linkDeviceTokenToUserResponse {
	return: MessageVO | null;
}

export interface recoverUsernameArgs {
	emailAddress: string | null;
}

export interface recoverUsernameResponse {
	return: MessageVO | null;
}

export interface getStudentPhotoArgs {
	userSessionVO: UserSessionVO | null;
	studentID: long;
}

export interface getStudentPhotoResponse {
	return: base64Binary | null;
}

export interface recoverPasswordArgs {
	userType: int;
	userName: string | null;
	recoveryToken: string | null;
	newPassword: string | null;
}

export interface recoverPasswordResponse {
	return: PasswordResetVO | null;
}

export interface getSchoolMapBySchoolNumberArgs {
	userSessionVO: UserSessionVO | null;
	schoolNumber: long;
}

export interface getSchoolMapBySchoolNumberResponse {
	return: base64Binary | null;
}

export interface storeNotificationSettingsArgs {
	userSessionVO: UserSessionVO | null;
	ns: NotificationSettingsVO | null;
}

export interface storeNotificationSettingsResponse {
	return: ResultsVO | null;
}

export interface getStartStopTimeForAllSectionsArgs {
	userSessionVO: UserSessionVO | null;
	studentIDs: long | long[];
	month: int;
	year: int;
}

export interface getStartStopTimeForAllSectionsResponse {
	return: ResultsVO | null;
}

export interface BaseResultsVO {
	messageVOs: MessageVO | null;
}

export interface ResultsVO extends BaseResultsVO {
	studentDataVOs: StudentDataVO | StudentDataVO[] | null;
	userSessionVO: UserSessionVO | null;
}

export interface UserSessionVO {
	locale: Locale | null;
	serverCurrentTime: Date | null | string;
	serverInfo: ServerInfo | null;
	serviceTicket: string | null;
	studentIDs: long | long[] | null;
	ucProfileURIs: string | string[] | null;
	ucToken: string | null;
	userId: long;
	userType: int;
}

export interface Locale {
	ISO3Country: string | null;
	ISO3Language: string | null;
	country: string | null;
	displayCountry: string | null;
	displayLanguage: string | null;
	displayName: string | null;
	displayScript: string | null;
	displayVariant: string | null;
	extensionKeys: Set | null;
	language: string | null;
	script: string | null;
	unicodeLocaleAttributes: Set | null;
	unicodeLocaleKeys: Set | null;
	variant: string | null;
}

export interface Set {
	empty: boolean;
}

export interface MessageVO {
	description: string | null;
	id: string | null;
	msgCode: int;
	title: string | null;
}

export interface StudentDataVO {
	activities: ActivityVO | ActivityVO[] | null;
	archivedFinalGrades: ArchivedFinalGradeVO | ArchivedFinalGradeVO[] | null;
	assignmentCategories: AsmtCatVO | AsmtCatVO[] | null;
	assignmentScores: AssignmentScoreVO | AssignmentScoreVO[] | null;
	assignments: AssignmentVO | AssignmentVO[] | null;
	attendance: AttendanceVO | AttendanceVO[] | null;
	attendanceCodes: AttendanceCodeVO | AttendanceCodeVO[] | null;
	bulletins: BulletinLite | BulletinLite[] | null;
	citizenCodes: CitizenCodeVO | CitizenCodeVO[] | null;
	citizenGrades: CitizenGradeVO | CitizenGradeVO[] | null;
	enrollments: SectionEnrollmentVO | SectionEnrollmentVO[] | null;
	extension: string | null;
	feeBalance: FeeBalanceVO | null;
	feeTransactions: FeeTransactionVO | FeeTransactionVO[] | null;
	feeTypes: FeeTypeVO | FeeTypeVO[] | null;
	finalGrades: FinalGradeVO | FinalGradeVO[] | null;
	gradeScales: GradeScaleVO | GradeScaleVO[] | null;
	lunchTransactions: LunchTransactionVO | LunchTransactionVO[] | null;
	notInSessionDays: NotInSessionDayVO | NotInSessionDayVO[] | null;
	notificationSettingsVO: NotificationSettingsVO | null;
	periods: PeriodVO | PeriodVO[] | null;
	remoteSchools: SchoolVO | SchoolVO[] | null;
	reportingTerms: ReportingTermVO | ReportingTermVO[] | null;
	schools: SchoolVO | SchoolVO[] | null;
	sections: SectionVO | SectionVO[] | null;
	standards: StandardVO | StandardVO[] | null;
	standardsGrades: StandardGradeVO | StandardGradeVO[] | null;
	student: StudentVO | null;
	studentDcid: long;
	studentId: long;
	teachers: TeacherVO | TeacherVO[] | null;
	terms: TermVO | TermVO[] | null;
	yearId: int;
}

export interface ActivityVO {
	category: string | null;
	id: long;
	name: string | null;
	required: boolean;
}

export interface FinalGradeVO {
	commentValue: string | null;
	dateStored: Date | null;
	grade: string | null;
	id: long;
	percent: double;
	reportingTermId: long;
	sectionid: long;
	storeType: int;
}

export interface ArchivedFinalGradeVO extends FinalGradeVO {
	courseName: string | null;
	courseNumber: string | null;
	schoolId: long;
	sortOrder: int;
	storeCode: string | null;
	teacherName: string | null;
	termEndDate: Date | null;
	termId: long;
	termStartDate: Date | null;
	yearId: int;
}

export interface AsmtCatVO {
	abbreviation: string | null;
	description: string | null;
	gradeBookType: int;
	id: long;
	name: string | null;
}

export interface AssignmentScoreVO {
	assignmentId: long;
	collected: boolean;
	comment: string | null;
	exempt: boolean;
	gradeBookType: int;
	id: long;
	incomplete: boolean;
	late: boolean;
	letterGrade: string | null;
	missing: boolean;
	percent: string | null;
	score: string | null;
	scoretype: int;
}

export interface AssignmentVO {
	abbreviation: string | null;
	additionalCategoryIds: long | long[] | null;
	assignmentid: long;
	categoryId: long;
	description: string | null;
	dueDate: Date | null;
	gradeBookType: int;
	id: long;
	includeinfinalgrades: int;
	name: string | null;
	pointspossible: double;
	publishDaysBeforeDue: int;
	publishState: int;
	publishonspecificdate: Date | null;
	publishscores: int;
	sectionDcid: long;
	sectionid: long;
	type: int;
	weight: double;
}

export interface AttendanceVO {
	adaValueCode: double;
	adaValueTime: double;
	admValue: double;
	attCodeid: long;
	attComment: string | null;
	attDate: Date | null;
	attFlags: int;
	attInterval: int;
	attModeCode: string | null;
	ccid: long;
	id: long;
	periodid: long;
	schoolid: long;
	studentid: long;
	totalMinutes: double;
	transactionType: string | null;
	yearid: int;
}

export interface AttendanceCodeVO {
	attCode: string | null;
	codeType: int | null;
	description: string | null;
	id: long;
	schoolid: long;
	sortorder: int | null;
	yearid: int | null;
}

export interface CitizenCodeVO {
	codeName: string | null;
	description: string | null;
	id: long;
	sortOrder: int;
}

export interface CitizenGradeVO {
	codeId: long;
	reportingTermId: long;
	sectionId: long;
	storeType: int;
}

export interface SectionEnrollmentVO {
	endDate: Date | null;
	enrollStatus: int;
	id: long;
	startDate: Date | null;
}

export interface FeeBalanceVO {
	balance: double;
	credit: double;
	debit: double;
	id: long;
	schoolid: long;
	yearid: int;
}

export interface FeeTransactionVO {
	adjustment: double | null;
	courseName: string | null;
	courseNumber: string | null;
	creationdate: Date | null;
	dateValue: Date | null;
	departmentName: string | null;
	description: string | null;
	feeAmount: double | null;
	feeBalance: double | null;
	feeCategoryName: string | null;
	feePaid: double | null;
	feeTypeId: long;
	feeTypeName: string | null;
	feecharged: double | null;
	groupTransactionId: long;
	id: long;
	modificationdate: Date | null;
	originalfee: double | null;
	priority: int | null;
	proRated: int | null;
	schoolfeeId: long;
	schoolid: long;
	termid: long;
}

export interface FeeTypeVO {
	descript: string | null;
	feeCategoryName: string | null;
	id: long;
	schoolNumber: long;
	sort: int;
	title: string | null;
}

export interface GradeScaleVO {
	description: string | null;
	gradeBookType: int;
	gradeScaleItems: GradeScaleItemVO | GradeScaleItemVO[] | null;
	id: long;
	name: string | null;
	numeric: int;
	numericMax: int;
	numericMin: int;
	numericPrecision: int;
	numericScale: int;
}

export interface GradeScaleItemVO {
	cutoffPercent: decimal | null;
	defaultZeroCutoff: boolean;
	description: string | null;
	gradeBookType: int;
	gradeLabel: string | null;
	id: long;
	percentValue: decimal | null;
	pointsValue: decimal | null;
	sortOrder: int;
}

export interface LunchTransactionVO {
	cash: double | null;
	credit: double | null;
	dateValue: Date | null;
	debit: double | null;
	description: string | null;
	id: long;
	mealprice: double | null;
	neteffect: double | null;
	time: int | null;
}

export interface NotInSessionDayVO {
	calType: string | null;
	calendarDay: Date | null;
	description: string | null;
	id: long;
	schoolNumber: long;
}

export interface NotificationSettingsVO {
	applyToAllStudents: boolean;
	balanceAlerts: boolean;
	detailedAssignments: boolean;
	detailedAttendance: boolean;
	emailAddresses: string | string[] | null;
	frequency: int;
	gradeAndAttSummary: boolean;
	guardianStudentId: long;
	mainEmail: string | null;
	schoolAnnouncements: boolean;
	sendNow: boolean;
}

export interface PeriodVO {
	abbreviation: string | null;
	id: long;
	name: string | null;
	periodNumber: int;
	schoolid: long;
	sortOrder: int;
	yearid: int;
}

export interface SchoolVO {
	abbreviation: string | null;
	address: string | null;
	currentTermId: long;
	disabledFeatures: DisabledFeaturesVO | null;
	highGrade: int | null;
	lowGrade: int | null;
	mapMimeType: string | null;
	name: string | null;
	schoolDisabled: boolean;
	schoolDisabledMessage: string | null;
	schoolDisabledTitle: string | null;
	schoolId: long;
	schoolMapModifiedDate: Date | null;
	schoolNumber: long;
	schooladdress: string | null;
	schoolcity: string | null;
	schoolcountry: string | null;
	schoolfax: string | null;
	schoolphone: string | null;
	schoolstate: string | null;
	schoolzip: string | null;
}

export interface DisabledFeaturesVO {
	activities: boolean;
	assignments: boolean;
	attendance: boolean;
	citizenship: boolean;
	currentGpa: boolean;
	emailalerts: boolean;
	fees: boolean;
	finalGrades: boolean;
	meals: boolean;
	pushAttendance: boolean;
	pushGrade: boolean;
	standards: boolean;
}

export interface ReportingTermVO {
	abbreviation: string | null;
	endDate: Date | null;
	id: long;
	schoolid: long;
	sendingGrades: boolean;
	sortOrder: int;
	startDate: Date | null;
	suppressGrades: boolean;
	suppressPercents: boolean;
	termid: long;
	title: string | null;
	yearid: int;
}

export interface SectionVO {
	courseCode: string | null;
	dcid: long;
	description: string | null;
	enrollments: SectionEnrollmentVO | SectionEnrollmentVO[] | null;
	expression: string | null;
	gradeBookType: int;
	id: long;
	periodSort: int | null;
	roomName: string | null;
	schoolCourseTitle: string | null;
	schoolNumber: long;
	sectionNum: string | null;
	startStopDates: StartStopDateVO | StartStopDateVO[] | null;
	teacherID: long;
	termID: long;
}

export interface StartStopDateVO {
	sectionEnrollmentId: long;
	start: Date | null;
	stop: Date | null;
}

export interface StandardVO {
	description: string | null;
	gradeBookType: int;
	gradeScaleID: long;
	id: long;
	identifier: string | null;
	name: string | null;
	parentStandardID: long;
	sortOrder: int;
}

export interface StandardGradeVO {
	comment: string | null;
	commentLastUpdated: Date | null;
	exempt: int;
	gradeBookType: int;
	gradeEntered: string | null;
	gradeLastUpdated: Date | null;
	gradeType: int;
	id: long;
	late: int;
	missing: int;
	reportingTermId: long;
	sectionDcid: long;
	sectionId: long;
	standardId: long;
}

export interface StudentVO {
	currentGPA: string | null;
	currentMealBalance: double;
	currentTerm: string | null;
	dcid: long;
	dob: Date | null;
	ethnicity: string | null;
	firstName: string | null;
	gender: string | null;
	gradeLevel: int;
	guardianAccessDisabled: boolean;
	id: long;
	lastName: string | null;
	middleName: string | null;
	photoDate: Date | null;
	startingMealBalance: double;
}

export interface TeacherVO {
	email: string | null;
	firstName: string | null;
	id: long;
	lastName: string | null;
	schoolPhone: string | null;
}

export interface TermVO {
	abbrev: string | null;
	endDate: Date | null;
	id: long;
	parentTermId: long;
	schoolNumber: string | null;
	startDate: Date | null;
	suppressed: boolean;
	title: string | null;
}

export interface QueryIncludeListVO {
	includes: int | int[] | null;
}

export interface CredentialComplexityRulesVO extends BaseResultsVO {
	lettersAndNumRequired: boolean;
	mixOfCaseRequired: boolean;
	requiredCharacterCount: int;
	specialCharacterRequired: boolean;
	successful: boolean;
}

export interface PasswordResetVO extends BaseResultsVO {
	minPasswordLength: int;
	serviceTicket: string | null;
	successful: boolean;
}

export interface ServerInfo {
	apiVersion: string | null;
	dayLightSavings: int;
	parentSAMLEndPoint: string | null;
	publicPortalDisabled: boolean;
	publicPortalDisabledMessage: string | null;
	rawOffset: int;
	serverTime: Date | null;
	standardTimeZoneName: string | null;
	studentSAMLEndPoint: string | null;
	teacherSAMLEndPoint: string | null;
	timeZoneName: string | null;
}

export interface BulletinLite {
	audience: long;
	body: string | null;
	endDate: Date | null;
	id: long;
	name: string | null;
	schoolId: long;
	sortOrder: int;
	startDate: Date | null;
}
