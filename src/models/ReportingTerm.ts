import { CacheInfo } from "..";
import { ReportingTermVO } from "../types";
import type FinalGrade from "./FinalGrade";
import type Term from "./Term";

/**
 * A PowerSchool reporting term. Marks are divided and given out in reporting terms.
 */
export default class ReportingTerm {
	private declare _cache: CacheInfo;

	/**
	 * The ID of this reporting term.
	 */
	public declare id: number;

	/**
	 * The title of this reporting term.
	 */
	public declare title: string | null;

	/**
	 * The ID of this reporting term's term.
	 */
	public declare termID: number;

	/**
	 * A number to use to sort this reporting term among others.
	 */
	public declare sortOrder: number;

	/**
	 * Whether or not to suppress showing grades from this reporting term.
	 */
	public declare suppressGrades: boolean;

	/**
	 * Whether or not to suppress showing grade percentages from this reporting term.
	 */
	public declare suppressPercents: boolean;

	/**
	 * The abbreviated title of this reporting term, for use in smaller spaces.
	 */
	public declare abbreviatedTitle: string | null;

	/**
	 *
	 */
	public declare endDate: Date | null;

	/**
	 *
	 */
	public declare sendingGrades: boolean;

	/**
	 *
	 */
	public declare startDate: Date | null;

	/**
	 *
	 */
	public declare yearID: number;

	/**
	 * Get the term this reporting term is from.
	 */
	public get term(): Term {
		return this._cache.terms[this.termID];
	}

	/**
	 * Get the final grades returned from this reporting term.
	 */
	public get finalGrades(): FinalGrade[] {
		return Object.values(this._cache.finalGrades).filter((g: any) => g.reportingTermID == this.id) as FinalGrade[];
	}

	/**
	 * @internal
	 */
	constructor(
		cache: CacheInfo,
		id: number,
		title: string | null,
		termID: number,
		sortOrder: number,
		suppressGrades: boolean,
		suppressPercents: boolean,
		abbreviatedTitle: string | null = null,
		endDate: Date | null,
		sendingGrades: boolean,
		startDate: Date | null,
		yearID: number
	) {
		this._cache = cache ?? null;
		this.abbreviatedTitle = abbreviatedTitle ?? null;
		this.endDate = endDate ?? null;
		this.id = id ?? null;
		this.sendingGrades = sendingGrades ?? null;
		this.sortOrder = sortOrder ?? null;
		this.startDate = startDate ?? null;
		this.suppressGrades = suppressGrades ?? null;
		this.suppressPercents = suppressPercents ?? null;
		this.termID = termID ?? null;
		this.title = title ?? null;
		this.yearID = yearID ?? null;
	}

	/**
	 * @internal
	 */
	static fromData(data: ReportingTermVO, cache: CacheInfo) {
		return new ReportingTerm(
			cache,
			data.id != null ? +data.id : null!,
			data.title,
			data.termid != null ? +data.termid : null!,
			data.sortOrder != null ? +data.sortOrder : null!,
			data.suppressGrades,
			data.suppressPercents,
			data.abbreviation,
			data.endDate,
			data.sendingGrades,
			data.startDate,
			data.yearid
		);
	}
}
