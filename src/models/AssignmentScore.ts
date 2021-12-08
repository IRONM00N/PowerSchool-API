import { CacheInfo } from "..";
import { AssignmentScoreVO } from "../types";
import type Assignment from "./Assignment";

/**
 * The score received for a PowerSchool assignment.
 */
export default class AssignmentScore {
	/**
	 * The API cache.
	 */
	private declare _cache: CacheInfo;

	/**
	 * The secondary ID of this assignment in the system.
	 */
	public declare assignmentID: number;

	/**
	 * Whether or not this assignment has been collected yet.
	 */
	public declare collected: boolean;

	/**
	 * The teacher's comment on this assignment, if available.
	 */
	public declare comment: string | null;

	/**
	 * Whether or not the student is exempt from completing this assignment.
	 */
	public declare exempt: boolean;

	/**
	 * The grade book type for this assignment.
	 */
	public declare gradeBookType: number;

	/**
	 * The ID of this assignment.
	 */
	public declare id: number;

	/**
	 * Whether or not this assignment is incomplete.
	 */
	public declare incomplete: boolean;

	/**
	 * Whether or not this assignment is late.
	 */
	public declare late: boolean;

	/**
	 * The letter grade received on this assignment (can be any string used for display of score).
	 */
	public declare letterGrade: string | null;

	/**
	 * Whether or not this assignment is missing.
	 */
	public declare missing: boolean;

	/**
	 * The score received on this assignment (as a percentage value from 0-1), if able to calculate.
	 */
	public declare percentage: number | null;

	/**
	 * The score received on this assignment.
	 */
	public declare score: string | null;

	/**
	 * The scoring type used on this assignment.
	 */
	public declare scoreType: number;

	/**
	 * Get the assignment this score was received on.
	 */
	public get assignment(): Assignment {
		return this._cache.assignments[this.assignmentID];
	}

	/**
	 * @internal
	 */
	constructor(cache: CacheInfo, data: AssignmentScoreData) {
		this._cache = cache ?? null;
		this.assignmentID = data.assignmentID ?? null;
		this.collected = data.collected ?? null;
		this.comment = data.comment ?? null;
		this.exempt = data.exempt ?? null;
		this.gradeBookType = data.gradeBookType ?? null;
		this.id = data.id ?? null;
		this.incomplete = data.incomplete ?? null;
		this.late = data.late ?? null;
		this.letterGrade = data.letterGrade ?? null;
		this.missing = data.missing ?? null;
		this.percentage = data.percentage ?? null;
		this.score = data.score ?? null;
		this.scoreType = data.scoreType ?? null;
	}

	/**
	 * @internal
	 */
	static fromData(data: AssignmentScoreVO, cache: CacheInfo) {
		// Calculate floating percentage from the odd string given
		let percentage: number | null = Number.parseFloat(data.percent ?? "0");
		if (Number.isNaN(percentage)) percentage = null;
		if (percentage !== null) percentage /= 100;

		return new AssignmentScore(cache, {
			assignmentID: data.assignmentId != null ? +data.assignmentId : null!,
			collected: data.collected,
			comment: data.comment,
			exempt: data.exempt,
			gradeBookType: data.gradeBookType,
			id: data.id != null ? +data.id : null!,
			incomplete: data.incomplete,
			late: data.late,
			letterGrade: data.letterGrade,
			missing: data.missing,
			percentage: percentage != null ? +percentage : null,
			score: data.score,
			scoreType: data.scoretype != null ? +data.scoretype : null!,
		});
	}
}

export interface AssignmentScoreData {
	assignmentID: number;
	collected: boolean;
	comment: string | null;
	exempt: boolean;
	gradeBookType: number;
	id: number;
	incomplete: boolean;
	late: boolean;
	letterGrade: string | null;
	missing: boolean;
	percentage: number | null;
	score: string | null;
	scoreType: number;
}
