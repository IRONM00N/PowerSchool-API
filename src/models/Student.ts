import type { CacheInfo } from "../index.js";
import { parseDate, parseLong, StudentVO as StudentData } from "../types.js";
import type ReportingTerm from "./ReportingTerm.js";

/**
 * A object meant for holding basic information about a student.
 */
export default class Student {
	#data: StudentData;
	/**
	 * The API cache.
	 */
	#cache: CacheInfo;

	/**
	 * The student's current GPA, if grades are available (null if not).
	 */
	public get currentGPA(): string | null {
		return this.#data.currentGPA ?? null;
	}

	/**
	 * The student's current meal balance, if supported.
	 */
	public get currentMealBalance(): number {
		return parseLong(this.#data.currentMealBalance) ?? 0;
	}

	/**
	 * The student's current term, if available (null if not).
	 */
	public get currentTerm(): string | null {
		return this.#data.currentTerm ?? null;
	}

	/**
	 * The student's date of birth.
	 */
	public get dateOfBirth(): Date | null {
		return parseDate(this.#data.dob);
	}

	/**
	 * The student's ethnicity (can be one of many things determined by the school itself).
	 */
	public get ethnicity(): string | null {
		return this.#data.ethnicity ?? null;
	}

	/**
	 * The student's first/given name.
	 */
	public get firstName(): string | null {
		return this.#data.firstName ?? null;
	}

	/**
	 * The student's gender (can be one of many things determined by the school itself).
	 */
	public get gender(): string | null {
		return this.#data.gender ?? null;
	}

	/**
	 * The grade the student is currently in.
	 */
	public get gradeLevel(): number {
		return parseLong(this.#data.gradeLevel);
	}

	/**
	 * The student's ID.
	 */
	public get id(): number {
		return parseLong(this.#data.id);
	}

	/**
	 * The student's last name/surname.
	 */
	public get lastName(): string | null {
		return this.#data.lastName ?? null;
	}

	/**
	 * The student's middle name.
	 */
	public get middleName(): string | null {
		return this.#data.middleName ?? null;
	}

	/**
	 * The date the student's photo was taken on.
	 */
	public get photoDate(): Date | null {
		return parseDate(this.#data.photoDate);
	}

	/**
	 * The student's starting meal balance, if supported.
	 */
	public get startingMealBalance(): number {
		return parseLong(this.#data.startingMealBalance) ?? 0;
	}

	/**
	 * Get the current reporting term the student is in.
	 */
	public get currentReportingTerm(): ReportingTerm {
		// Why did they make this a title instead of ID?
		return Object.values(this.#cache.reportingTerms).find((term) => term.title == this.currentTerm)!;
	}

	/**
	 * @internal
	 */
	constructor(data: StudentData, cache: CacheInfo) {
		this.#data = data ?? null;
		this.#cache = cache ?? null;
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

	public toString(): string {
		return this.getFormattedName();
	}
}
