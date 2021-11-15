import type PowerSchoolAPI from "..";
import { ReportingTermVO } from "../types";
import type FinalGrade from "./FinalGrade";
import type Term from "./Term";

/**
 * A PowerSchool reporting term. Marks are divided and given out in reporting terms.
 */
export default class ReportingTerm {
	private declare api: PowerSchoolAPI;

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
	 * Get the term this reporting term is from.
	 */
	public get term(): Term {
		return this.api._cachedInfo.terms[this.termID];
	}

	/**
	 * Get the final grades returned from this reporting term.
	 */
	public get finalGrades(): FinalGrade[] {
		return Object.values(this.api._cachedInfo.finalGrades).filter(
			(g: any) => g.reportingTermID == this.id
		) as FinalGrade[];
	}

	/**
	 * @internal
	 */
	constructor(
		api: PowerSchoolAPI,
		id: number,
		title: string | null,
		termID: number,
		sortOrder: number,
		suppressGrades: boolean,
		suppressPercents: boolean,
		abbreviatedTitle: string | null = null
	) {
		this.api = api ?? null;
		this.id = id ?? null;
		this.title = title ?? null;
		this.termID = termID ?? null;
		this.sortOrder = sortOrder ?? null;
		this.suppressGrades = suppressGrades ?? null;
		this.suppressPercents = suppressPercents ?? null;
		this.abbreviatedTitle = abbreviatedTitle ?? null;
	}

	/**
	 * @internal
	 */
	static fromData(data: ReportingTermVO, api: PowerSchoolAPI) {
		return new ReportingTerm(
			api,
			data.id != null ? +data.id : null,
			data.title,
			data.termid != null ? +data.termid : null,
			data.sortOrder != null ? +data.sortOrder : null,
			data.suppressGrades,
			data.suppressPercents,
			data.abbreviation
		);
	}
}
