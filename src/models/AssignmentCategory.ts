import { CacheInfo } from "..";
import { AsmtCatVO } from "../types";
import type Assignment from "./Assignment";

/**
 * A category for a PowerSchool assignment.
 */
export default class AssignmentCategory {
	private declare _cache: CacheInfo;

	/**
	 * The ID of this assignment.
	 */
	public declare id: number;

	/**
	 * The name of this category.
	 */
	public declare name: string | null;

	/**
	 * A shorter name for this category.
	 */
	public declare abbreviation: string | null;

	/**
	 * A description of this category, if available.
	 */
	public declare description: string | null;

	/**
	 * The grade book type for this assignment.
	 */
	public declare gradeBookType: number;

	/**
	 * The assignments in this category.
	 */
	public declare assignments: Assignment[];

	/**
	 * @internal
	 */
	public constructor(
		cache: CacheInfo,
		id: number,
		name: string | null,
		abbreviation: string | null,
		description: string | null,
		gradeBookType: number
	) {
		this._cache = cache ?? null;
		this.abbreviation = abbreviation ?? null;
		this.assignments = [];
		this.description = description ?? null;
		this.gradeBookType = gradeBookType ?? null;
		this.id = id ?? null;
		this.name = name ?? null;
	}

	/**
	 * @internal
	 */
	public static fromData(data: AsmtCatVO, cache: CacheInfo) {
		return new AssignmentCategory(
			cache,
			data.id != null ? data.id : null!,
			data.name,
			data.abbreviation,
			data.description,
			data.gradeBookType != null ? +data.gradeBookType : null!
		);
	}
}
