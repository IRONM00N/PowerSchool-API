import type PowerSchoolAPI from "..";
import { TermVO } from "../types";
import type School from "./School";

/**
 * A PowerSchool term, for which courses can be a part of.
 */
export default class Term {
	private declare api: PowerSchoolAPI;

	/**
	 * The ID of this term.
	 */
	public declare id: number;

	/**
	 * The title of this term.
	 */
	public declare title: string | null;

	/**
	 * The start date of this term.
	 */
	public declare startDate: Date | null;

	/**
	 * The end date of this term.
	 */
	public declare endDate: Date | null;

	/**
	 * The ID of this term's parent (0 if none).
	 */
	public declare parentTermID: number;

	/**
	 * The number of the school this term is from.
	 */
	public declare schoolNumber: string | null;

	/**
	 * The abbreviated title of this term, for use in smaller spaces.
	 */
	public declare abbreviatedTitle: string | null;

	/**
	 * Get the school this term is from.
	 */
	public get school(): School {
		if (!this.schoolNumber) throw new Error("schoolNumber is null");
		return this.api._cachedInfo.schools[this.schoolNumber];
	}

	/**
	 * @internal
	 */
	constructor(
		api: PowerSchoolAPI,
		id: number,
		title: string | null,
		startDate: Date | null,
		endDate: Date | null,
		parentTermID: number,
		schoolNumber: string | null,
		abbreviatedTitle: string | null = null
	) {
		this.api = api ?? null;
		this.id = id ?? null;
		this.title = title ?? null;
		this.startDate = startDate ?? null;
		this.endDate = endDate ?? null;
		this.parentTermID = parentTermID ?? null;
		this.schoolNumber = schoolNumber ?? null;
		this.abbreviatedTitle = abbreviatedTitle ?? null;
	}

	/**
	 * @internal
	 */
	static fromData(data: TermVO, api: PowerSchoolAPI) {
		return new Term(
			api,
			data.id != null ? +data.id : null,
			data.title,
			data.startDate ? new Date(data.startDate) : null,
			data.endDate ? new Date(data.endDate) : null,
			data.parentTermId != null ? +data.parentTermId : null,
			data.schoolNumber,
			data.abbrev
		);
	}
}
