import type PowerSchoolAPI from "..";
import { StudentVO } from "../types";
import type ReportingTerm from "./ReportingTerm";

/**
 * A object meant for holding basic information about a student.
 */
export default class Student {
	private declare api: PowerSchoolAPI;

	/**
	 * The student's ID.
	 */
	public declare id: number;

	/**
	 * The student's first/given name.
	 */
	public declare firstName: string | null;

	/**
	 * The student's middle name.
	 */
	public declare middleName: string | null;

	/**
	 * The student's last name/surname.
	 */
	public declare lastName: string | null;

	/**
	 * The student's date of birth.
	 */
	public declare dateOfBirth: Date | null;

	/**
	 * The student's ethnicity (can be one of many things determined by the school itself).
	 */
	public declare ethnicity: string | null;

	/**
	 * The student's gender (can be one of many things determined by the school itself).
	 */
	public declare gender: string | null;

	/**
	 * The grade the student is currently in.
	 */
	public declare gradeLevel: number;

	/**
	 * The student's current GPA, if grades are available (null if not).
	 */
	public declare currentGPA: string | null;

	/**
	 * The student's current term, if available (null if not).
	 */
	public declare currentTerm: string | null;

	/**
	 * The date the student's photo was taken on.
	 */
	public declare photoDate: Date | null;

	/**
	 * The student's current meal balance, if supported.
	 */
	public declare currentMealBalance: number;

	/**
	 * The student's starting meal balance, if supported.
	 */
	public declare startingMealBalance: number;

	/**
	 * Get the current reporting term the student is in.
	 */
	public get currentReportingTerm(): ReportingTerm {
		// Why did they make this a title instead of ID?
		return Object.values(this.api._cachedInfo.reportingTerms).find((term) => term.title == this.currentTerm);
	}

	/**
	 * @internal
	 */
	constructor(
		api: PowerSchoolAPI,
		id: number,
		firstName: string | null,
		middleName: string | null,
		lastName: string | null,
		dateOfBirth: Date | null,
		ethnicity: string | null,
		gender: string | null,
		gradeLevel: number,
		currentGPA: string | null,
		currentTerm: string | null,
		photoDate: Date | null = null,
		currentMealBalance = 0,
		startingMealBalance = 0
	) {
		this.api = api ?? null;
		this.id = id ?? null;
		this.firstName = firstName ?? null;
		this.middleName = middleName ?? null;
		this.lastName = lastName ?? null;
		this.dateOfBirth = dateOfBirth ?? null;
		this.ethnicity = ethnicity ?? null;
		this.gender = gender ?? null;
		this.gradeLevel = gradeLevel ?? null;
		this.currentGPA = currentGPA ?? null;
		this.currentTerm = currentTerm ?? null;
		this.photoDate = photoDate ?? null;
		this.currentMealBalance = currentMealBalance ?? null;
		this.startingMealBalance = startingMealBalance ?? null;
	}

	/**
	 * @internal
	 */
	static fromData(data: StudentVO, api: PowerSchoolAPI) {
		return new Student(
			api,
			data.id != null ? +data.id : null,
			data.firstName,
			data.middleName,
			data.lastName,
			data.dob ? new Date(data.dob) : null,
			data.ethnicity,
			data.gender,
			data.gradeLevel != null ? +data.gradeLevel : null,
			data.currentGPA || null,
			data.currentTerm,
			data.photoDate ? new Date(data.photoDate) : null,
			data.currentMealBalance != null ? +data.currentMealBalance : null,
			data.startingMealBalance != null ? +data.startingMealBalance : null
		);
	}

	/**
	 * Get the parts making up a student's name.
	 * @param includeMiddleName - Whether or not to include the student's middle name.
	 */
	public getNameParts(includeMiddleName: boolean = false): string[] {
		if (!this.firstName) throw new Error("firstName is null");
		if (!this.lastName) throw new Error("lastName is null");
		if (includeMiddleName && !this.middleName) throw new Error("middleName is null");
		if (includeMiddleName && this.middleName!.length > 0) return [this.firstName, this.middleName!, this.lastName];
		return [this.firstName, this.lastName];
	}

	/**
	 * Get student's name formatted for display.
	 * @param includeMiddleName - Whether or not to include the student's middle name.
	 */
	public getFormattedName(includeMiddleName: boolean = false): string {
		return this.getNameParts(includeMiddleName).join(" ");
	}
}
