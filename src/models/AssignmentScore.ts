import type { CacheInfo } from "../index.js";
import { AssignmentScoreVO as AssignmentScoreData, int, parseLong } from "../types.js";
import type Assignment from "./Assignment.js";

/**
 * The score received for a PowerSchool assignment.
 */
export default class AssignmentScore {
	#data: AssignmentScoreData;
	/**
	 * The API cache.
	 */
	#cache: CacheInfo;

	/**
	 * The secondary ID of this assignment in the system.
	 */
	public get assignmentID(): number {
		return parseLong(this.#data.assignmentId);
	}

	/**
	 * Whether or not this assignment has been collected yet.
	 */
	public get collected(): boolean {
		return this.#data.collected ?? null;
	}

	/**
	 * The teacher's comment on this assignment, if available.
	 */
	public get comment(): string | null {
		return this.#data.comment ?? null;
	}

	/**
	 * Whether or not the student is exempt from completing this assignment.
	 */
	public get exempt(): boolean {
		return this.#data.exempt ?? null;
	}

	/**
	 * The grade book type for this assignment.
	 */
	public get gradeBookType(): number {
		return this.#data.gradeBookType ?? null!;
	}

	/**
	 * The ID of this assignment.
	 */
	public get id(): number {
		return parseLong(this.#data.id);
	}

	/**
	 * Whether or not this assignment is incomplete.
	 */
	public get incomplete(): boolean {
		return this.#data.incomplete ?? null;
	}

	/**
	 * Whether or not this assignment is late.
	 */
	public get late(): boolean {
		return this.#data.late ?? null;
	}

	/**
	 * The letter grade received on this assignment (can be any string used for display of score).
	 */
	public get letterGrade(): string | null {
		return this.#data.letterGrade ?? null;
	}

	/**
	 * Whether or not this assignment is missing.
	 */
	public get missing(): boolean {
		return this.#data.missing ?? null;
	}

	/**
	 * The score received on this assignment (as a percentage value from 0-1), if able to calculate.
	 */
	public get percentage(): number | null {
		// Calculate floating percentage from the odd string given
		let percentage: number | null = Number.parseFloat(this.#data.percent ?? "0");
		if (Number.isNaN(percentage)) percentage = null;
		if (percentage !== null) percentage /= 100;
		return percentage != null ? Number(percentage) : null;
	}

	/**
	 * The score received on this assignment.
	 */
	public get score(): string | null {
		return this.#data.score ?? null;
	}

	/**
	 * The scoring type used on this assignment.
	 */
	public get scoreType(): int {
		// this shouldn't need to be called
		return parseLong(this.#data.scoretype);
	}

	/**
	 * Get the assignment this score was received on.
	 */
	public get assignment(): Assignment {
		return this.#cache.assignments[this.assignmentID];
	}

	/**
	 * @internal
	 */
	constructor(data: AssignmentScoreData, cache: CacheInfo) {
		this.#data = data ?? null;
		this.#cache = cache ?? null;
	}
}
