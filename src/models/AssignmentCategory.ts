import { CacheInfo } from "..";
import { AsmtCatVO } from "../types";
import type Assignment from "./Assignment";

/**
 * A category for a PowerSchool assignment.
 */
export default class AssignmentCategory {
	/**
	 * The API cache.
	 */
	private declare _cache: CacheInfo;

	/**
	 * A shorter name for this category.
	 */
	public declare abbreviation: string | null;

	/**
	 * The assignments in this category.
	 */
	public declare assignments: Assignment[];

	/**
	 * A description of this category, if available.
	 */
	public declare description: string | null;

	/**
	 * The grade book type for this assignment.
	 */
	public declare gradeBookType: number;

	/**
	 * The ID of this assignment.
	 */
	public declare id: number;

	/**
	 * The name of this category.
	 */
	public declare name: string | null;

	/**
	 * @internal
	 */
	public constructor(cache: CacheInfo, data: AssignmentCategoryData) {
		this._cache = cache ?? null;
		this.abbreviation = data.abbreviation ?? null;
		this.assignments = [];
		this.description = data.description ?? null;
		this.gradeBookType = data.gradeBookType ?? null;
		this.id = data.id ?? null;
		this.name = data.name ?? null;
	}

	/**
	 * @internal
	 */
	public static fromData(data: AsmtCatVO, cache: CacheInfo) {
		return new AssignmentCategory(cache, {
			abbreviation: data.abbreviation,
			description: data.description,
			gradeBookType: data.gradeBookType != null ? +data.gradeBookType : null!,
			id: data.id != null ? +data.id : null!,
			name: data.name,
		});
	}
}

export interface AssignmentCategoryData {
	abbreviation: string | null;
	description: string | null;
	gradeBookType: number;
	id: number;
	name: string | null;
}
