import { CacheInfo } from '..';
import { TermVO } from "../types";
import type School from "./School";

/**
 * A PowerSchool term, for which courses can be a part of.
 */
export default class Term {
	private declare _cache: CacheInfo;

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
	public declare schoolNumber: number | null;

	/**
	 * The abbreviated title of this term, for use in smaller spaces.
	 */
	public declare abbreviatedTitle: string | null;

	/**
	 * Whether or not this term is suppressed / hidden.
	 */
	public declare suppressed: boolean;

	/**
	 * Get the school this term is from.
	 */
	public get school(): School {
		if (!this.schoolNumber) throw new Error("schoolNumber is null");
		return this._cache.schools[+this.schoolNumber];
	}

	/**
	 * @internal
	 */
	constructor(
		cache: CacheInfo,
		id: number,
		title: string | null,
		startDate: Date | null,
		endDate: Date | null,
		parentTermID: number,
		schoolNumber: number | null,
		abbreviatedTitle: string | null,
		suppressed: boolean
	) {
		this._cache = cache ?? null;
		this.abbreviatedTitle = abbreviatedTitle ?? null;
		this.endDate = endDate ?? null;
		this.id = id ?? null;
		this.parentTermID = parentTermID ?? null;
		this.schoolNumber = schoolNumber ?? null;
		this.startDate = startDate ?? null;
		this.suppressed = suppressed ?? null;
		this.title = title ?? null;
	}

	/**
	 * @internal
	 */
	static fromData(data: TermVO, cache: CacheInfo) {
		return new Term(
			cache,
			data.id != null ? +data.id : null!,
			data.title,
			data.startDate ? new Date(data.startDate) : null,
			data.endDate ? new Date(data.endDate) : null,
			data.parentTermId != null ? +data.parentTermId : null!,
			data.schoolNumber != null ? +data.schoolNumber : null, // for some reason this is a string and not a number even though it is a number
			data.abbrev,
			data.suppressed
		);
	}
}
