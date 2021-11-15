import type PowerSchoolAPI from "..";
import { PeriodVO } from "../types";
import type School from "./School";

/**
 * A PowerSchool period.
 */
export default class Period {
	private declare api: PowerSchoolAPI;

	/**
	 * The abbreviation of this period.
	 */
	public declare abbreviation: string | null;

	/**
	 * The ID of this period.
	 */
	public declare id: number;

	/**
	 * The name of this period.
	 */
	public declare name: string | null;

	/**
	 * The number of this period.
	 */
	public declare number: number;

	/**
	 * The id of the school this period is from.
	 */
	public declare schoolID: number;

	/**
	 * A number to use to sort this period among others.
	 */
	public declare sortOrder: number;

	/**
	 * The year ID of this period.
	 */
	public declare yearID: number;

	/**
	 * Get the school this period is from.
	 */
	public get school(): School {
		return this.api._cachedInfo.schools[this.schoolID];
	}

	/**
	 * @internal
	 */
	constructor(
		api: PowerSchoolAPI,
		abbreviation: string | null,
		id: number,
		name: string | null,
		number: number,
		schoolID: number,
		sortOrder: number,
		yearID: number
	) {
		this.api = api ?? null;
		this.abbreviation = abbreviation ?? null;
		this.id = id ?? null;
		this.name = name ?? null;
		this.number = number ?? null;
		this.schoolID = schoolID ?? null;
		this.sortOrder = sortOrder ?? null;
		this.yearID = yearID ?? null;
	}

	/**
	 * @internal
	 */
	public static fromData(data: PeriodVO, api: PowerSchoolAPI) {
		return new Period(
			api,
			data.abbreviation,
			data.id != null ? +data.id : null,
			data.name,
			data.periodNumber != null ? +data.periodNumber : null,
			data.schoolid != null ? +data.schoolid : null,
			data.sortOrder != null ? +data.sortOrder : null,
			data.yearid != null ? +data.yearid : null
		);
	}
}
