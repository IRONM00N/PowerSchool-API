import { CacheInfo } from "..";
import { PeriodVO } from "../types";
import type School from "./School";

/**
 * A PowerSchool period.
 */
export default class Period {
	/**
	 * The API cache.
	 */
	private declare _cache: CacheInfo;

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
		return this._cache.schools[this.schoolID];
	}

	/**
	 * @internal
	 */
	constructor(cache: CacheInfo, data: PeriodData) {
		this._cache = cache ?? null;
		this.abbreviation = data.abbreviation ?? null;
		this.id = data.id ?? null;
		this.name = data.name ?? null;
		this.number = data.number ?? null;
		this.schoolID = data.schoolID ?? null;
		this.sortOrder = data.sortOrder ?? null;
		this.yearID = data.yearID ?? null;
	}

	/**
	 * @internal
	 */
	public static fromData(data: PeriodVO, cache: CacheInfo) {
		return new Period(cache, {
			abbreviation: data.abbreviation,
			id: data.id != null ? +data.id : null!,
			name: data.name,
			number: data.periodNumber != null ? +data.periodNumber : null!,
			schoolID: data.schoolid != null ? +data.schoolid : null!,
			sortOrder: data.sortOrder != null ? +data.sortOrder : null!,
			yearID: data.yearid != null ? +data.yearid : null!,
		});
	}
}

export interface PeriodData {
	abbreviation: string | null;
	id: number;
	name: string | null;
	number: number;
	schoolID: number;
	sortOrder: number;
	yearID: number;
}
