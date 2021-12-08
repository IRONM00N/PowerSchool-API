import { CacheInfo } from "..";
import { ReportingTermVO } from "../types";
import type FinalGrade from "./FinalGrade";
import type Term from "./Term";

/**
 * A PowerSchool reporting term. Marks are divided and given out in reporting terms.
 */
export default class ReportingTerm {
	/**
	 * The API cache.
	 */
	private declare _cache: CacheInfo;

	/**
	 * The abbreviated title of this reporting term, for use in smaller spaces.
	 */
	public declare abbreviatedTitle: string | null;

	/**
	 * The date this reporting term ends.
	 */
	public declare endDate: Date | null;

	/**
	 * The ID of this reporting term.
	 */
	public declare id: number;

	/**
	 * Whether or not this reporting term is sending grades.
	 */
	public declare sendingGrades: boolean;

	/**
	 * A number to use to sort this reporting term among others.
	 */
	public declare sortOrder: number;

	/**
	 * The date this reporting term starts.
	 */
	public declare startDate: Date | null;

	/**
	 * Whether or not to suppress showing grades from this reporting term.
	 */
	public declare suppressGrades: boolean;

	/**
	 * Whether or not to suppress showing grade percentages from this reporting term.
	 */
	public declare suppressPercents: boolean;

	/**
	 * The ID of this reporting term's term.
	 */
	public declare termID: number;

	/**
	 * The title of this reporting term.
	 */
	public declare title: string | null;

	/**
	 * The ID of the year this reporting term is in.
	 */
	public declare yearID: number;

	/**
	 * Get the final grades returned from this reporting term.
	 */
	public get finalGrades(): FinalGrade[] {
		return Object.values(this._cache.finalGrades).filter((g: any) => g.reportingTermID == this.id) as FinalGrade[];
	}

	/**
	 * Get the term this reporting term is from.
	 */
	public get term(): Term {
		return this._cache.terms[this.termID];
	}

	/**
	 * @internal
	 */
	constructor(cache: CacheInfo, data: ReportingTermData) {
		this._cache = cache ?? null;
		this.abbreviatedTitle = data.abbreviatedTitle ?? null;
		this.endDate = data.endDate ?? null;
		this.id = data.id ?? null;
		this.sendingGrades = data.sendingGrades ?? null;
		this.sortOrder = data.sortOrder ?? null;
		this.startDate = data.startDate ?? null;
		this.suppressGrades = data.suppressGrades ?? null;
		this.suppressPercents = data.suppressPercents ?? null;
		this.termID = data.termID ?? null;
		this.title = data.title ?? null;
		this.yearID = data.yearID ?? null;
	}

	/**
	 * @internal
	 */
	static fromData(data: ReportingTermVO, cache: CacheInfo) {
		return new ReportingTerm(cache, {
			abbreviatedTitle: data.abbreviation,
			endDate: data.endDate,
			id: data.id != null ? +data.id : null!,
			sendingGrades: data.sendingGrades,
			sortOrder: data.sortOrder != null ? +data.sortOrder : null!,
			startDate: data.startDate,
			suppressGrades: data.suppressGrades,
			suppressPercents: data.suppressPercents,
			termID: data.termid != null ? +data.termid : null!,
			title: data.title,
			yearID: data.yearid,
		});
	}
}

export interface ReportingTermData {
	abbreviatedTitle: string | null;
	endDate: Date | null;
	id: number;
	sendingGrades: boolean;
	sortOrder: number;
	startDate: Date | null;
	suppressGrades: boolean;
	suppressPercents: boolean;
	termID: number;
	title: string | null;
	yearID: number;
}
