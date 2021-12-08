import { CacheInfo } from "..";
import { TermVO } from "../types";
import type School from "./School";

/**
 * A PowerSchool term, for which courses can be a part of.
 */
export default class Term {
	/**
	 * The API cache.
	 */
	private declare _cache: CacheInfo;

	/**
	 * The abbreviated title of this term, for use in smaller spaces.
	 */
	public declare abbreviatedTitle: string | null;

	/**
	 * The end date of this term.
	 */
	public declare endDate: Date | null;

	/**
	 * The ID of this term.
	 */
	public declare id: number;

	/**
	 * The ID of this term's parent (0 if none).
	 */
	public declare parentTermID: number;

	/**
	 * The number of the school this term is from.
	 */
	public declare schoolNumber: number | null;

	/**
	 * The start date of this term.
	 */
	public declare startDate: Date | null;

	/**
	 * Whether or not this term is suppressed / hidden.
	 */
	public declare suppressed: boolean;

	/**
	 * The title of this term.
	 */
	public declare title: string | null;

	/**
	 * Get the school this term is from.
	 */
	public get school(): School {
		if (this.schoolNumber == null) throw new Error("schoolNumber is null");
		return this._cache.schools[+this.schoolNumber];
	}

	/**
	 * @internal
	 */
	constructor(cache: CacheInfo, data: TermData) {
		this._cache = cache ?? null;
		this.abbreviatedTitle = data.abbreviatedTitle ?? null;
		this.endDate = data.endDate ?? null;
		this.id = data.id ?? null;
		this.parentTermID = data.parentTermID ?? null;
		this.schoolNumber = data.schoolNumber ?? null;
		this.startDate = data.startDate ?? null;
		this.suppressed = data.suppressed ?? null;
		this.title = data.title ?? null;
	}

	/**
	 * @internal
	 */
	static fromData(data: TermVO, cache: CacheInfo) {
		return new Term(cache, {
			abbreviatedTitle: data.abbrev,
			endDate: data.endDate ? new Date(data.endDate) : null,
			id: data.id != null ? +data.id : null!,
			parentTermID: data.parentTermId != null ? +data.parentTermId : null!,
			schoolNumber: data.schoolNumber != null ? +data.schoolNumber : null, // for some reason this is a string and not a number even though it is a number
			startDate: data.startDate ? new Date(data.startDate) : null,
			suppressed: data.suppressed,
			title: data.title,
		});
	}
}

export interface TermData {
	abbreviatedTitle: string | null;
	endDate: Date | null;
	id: number;
	parentTermID: number;
	schoolNumber: number | null;
	startDate: Date | null;
	suppressed: boolean;
	title: string | null;
}
