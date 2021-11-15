import type PowerSchoolAPI from "..";
import { AsmtCatVO } from "../types";
import type Assignment from "./Assignment";

/**
 * A category for a PowerSchool assignment.
 */
export default class AssignmentCategory {
	private declare api: PowerSchoolAPI;

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
		api: PowerSchoolAPI,
		id: number,
		name: string | null,
		abbreviation: string | null,
		description: string | null,
		gradeBookType: number
	) {
		this.api = api ?? null;
		this.id = id ?? null;
		this.name = name ?? null;
		this.abbreviation = abbreviation ?? null;
		this.description = description ?? null;
		this.gradeBookType = gradeBookType ?? null;
		this.assignments = [];
	}

	/**
	 * @internal
	 */
	public static fromData(data: AsmtCatVO, api: PowerSchoolAPI) {
		return new AssignmentCategory(
			api,
			data.id != null ? data.id : null,
			data.name,
			data.abbreviation,
			data.description,
			data.gradeBookType != null ? +data.gradeBookType : null
		);
	}
}
