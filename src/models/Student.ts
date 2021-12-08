import { CacheInfo } from "..";
import { StudentVO } from "../types";
import type ReportingTerm from "./ReportingTerm";

/**
 * A object meant for holding basic information about a student.
 */
export default class Student {
	/**
	 * The API cache.
	 */
	private declare _cache: CacheInfo;

	/**
	 * The student's current GPA, if grades are available (null if not).
	 */
	public declare currentGPA: string | null;

	/**
	 * The student's current meal balance, if supported.
	 */
	public declare currentMealBalance: number;

	/**
	 * The student's current term, if available (null if not).
	 */
	public declare currentTerm: string | null;

	/**
	 * The student's date of birth.
	 */
	public declare dateOfBirth: Date | null;

	/**
	 * The student's ethnicity (can be one of many things determined by the school itself).
	 */
	public declare ethnicity: string | null;

	/**
	 * The student's first/given name.
	 */
	public declare firstName: string | null;

	/**
	 * The student's gender (can be one of many things determined by the school itself).
	 */
	public declare gender: string | null;

	/**
	 * The grade the student is currently in.
	 */
	public declare gradeLevel: number;

	/**
	 * The student's ID.
	 */
	public declare id: number;

	/**
	 * The student's last name/surname.
	 */
	public declare lastName: string | null;

	/**
	 * The student's middle name.
	 */
	public declare middleName: string | null;

	/**
	 * The date the student's photo was taken on.
	 */
	public declare photoDate: Date | null;

	/**
	 * The student's starting meal balance, if supported.
	 */
	public declare startingMealBalance: number;

	/**
	 * Get the current reporting term the student is in.
	 */
	public get currentReportingTerm(): ReportingTerm {
		// Why did they make this a title instead of ID?
		return Object.values(this._cache.reportingTerms).find((term) => term.title == this.currentTerm)!;
	}

	/**
	 * @internal
	 */
	constructor(_cache: CacheInfo, data: StudentData) {
		this._cache = _cache ?? null;
		this.currentGPA = data.currentGPA ?? null;
		this.currentMealBalance = data.currentMealBalance ?? 0;
		this.currentTerm = data.currentTerm ?? null;
		this.dateOfBirth = data.dateOfBirth ?? null;
		this.ethnicity = data.ethnicity ?? null;
		this.firstName = data.firstName ?? null;
		this.gender = data.gender ?? null;
		this.gradeLevel = data.gradeLevel ?? null;
		this.id = data.id ?? null;
		this.lastName = data.lastName ?? null;
		this.middleName = data.middleName ?? null;
		this.photoDate = data.photoDate ?? null;
		this.startingMealBalance = data.startingMealBalance ?? 0;
	}

	/**
	 * @internal
	 */
	static fromData(data: StudentVO, _cache: CacheInfo) {
		return new Student(_cache, {
			currentGPA: data.currentGPA ?? null,
			currentMealBalance: data.currentMealBalance != null ? +data.currentMealBalance : null!,
			currentTerm: data.currentTerm,
			dateOfBirth: data.dob ? new Date(data.dob) : null,
			ethnicity: data.ethnicity,
			firstName: data.firstName,
			gender: data.gender,
			gradeLevel: data.gradeLevel != null ? +data.gradeLevel : null!,
			id: data.id != null ? +data.id : null!,
			lastName: data.lastName,
			middleName: data.middleName,
			photoDate: data.photoDate ? new Date(data.photoDate) : null,
			startingMealBalance: data.startingMealBalance != null ? +data.startingMealBalance : null!,
		});
	}

	/**
	 * Get the parts making up a student's name.
	 * @param includeMiddleName - Whether or not to include the student's middle name.
	 */
	public getNameParts(includeMiddleName: boolean = false): string[] {
		if (this.firstName == null) throw new Error("firstName is null");
		if (this.lastName == null) throw new Error("lastName is null");
		if (includeMiddleName && this.middleName == null) throw new Error("middleName is null");
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

export interface StudentData {
	currentGPA: string | null;
	currentMealBalance: number | null;
	currentTerm: string | null;
	dateOfBirth: Date | null;
	ethnicity: string | null;
	firstName: string | null;
	gender: string | null;
	gradeLevel: number;
	id: number;
	lastName: string | null;
	middleName: string | null;
	photoDate: Date | null;
	startingMealBalance: number | null;
}
