import type PowerSchoolAPI from "..";
import { AssignmentScoreVO } from "../types";
import type Assignment from "./Assignment";

/**
 * The score received for a PowerSchool assignment.
 */
export default class AssignmentScore {
	private api: PowerSchoolAPI;

	/**
	 * The ID of this assignment.
	 */
	public id: number;

	/**
	 * The secondary ID of this assignment in the system.
	 */
	public assignmentID: number;

	/**
	 * Whether or not this assignment has been collected yet.
	 */
	public collected: boolean;

	/**
	 * Whether or not this assignment is late.
	 */
	public late: boolean;

	/**
	 * Whether or not this assignment is missing.
	 */
	public missing: boolean;

	/**
	 * Whether or not the student is exempt from completing this assignment.
	 */
	public exempt: boolean;

	/**
	 * The grade book type for this assignment.
	 */
	public gradeBookType: number;

	/**
	 * The teacher's comment on this assignment, if available.
	 */
	public comment: string | null;

	/**
	 * The score received on this assignment.
	 */
	public score: string | null;

	/**
	 * The score received on this assignment (as a percentage value from 0-1), if able to calculate.
	 */
	public percentage: number | null;

	/**
	 * The letter grade received on this assignment (can be any string used for display of score).
	 */
	public letterGrade: string | null;

	/**
	 * The scoring type used on this assignment.
	 */
	public scoreType: number;

	/**
	 * Get the assignment this score was received on.
	 */
	public get assignment(): Assignment {
		return this.api._cachedInfo.assignments[this.assignmentID];
	}

	/**
	 * @internal
	 */
	constructor(
		api: PowerSchoolAPI,
		id: number,
		assignmentID: number,
		collected: boolean,
		late: boolean,
		missing: boolean,
		exempt: boolean,
		gradeBookType: number,
		comment: string | null,
		score: string | null,
		letterGrade: string | null,
		percentage: number | null,
		scoreType: number
	) {
		this.api = api ?? null;
		this.id = id ?? null;
		this.assignmentID = assignmentID ?? null;
		this.collected = collected ?? null;
		this.late = late ?? null;
		this.missing = missing ?? null;
		this.exempt = exempt ?? null;
		this.gradeBookType = gradeBookType ?? null;
		this.comment = comment ?? null;
		this.score = score ?? null;
		this.percentage = percentage ?? null;
		this.letterGrade = letterGrade ?? null;
		this.scoreType = scoreType ?? null;
	}

	/**
	 * @internal
	 */
	static fromData(data: AssignmentScoreVO, api: PowerSchoolAPI) {
		// Calculate floating percentage from the odd string given
		let percentage: number | null = Number.parseFloat(data.percent ?? "0");
		if (Number.isNaN(percentage)) percentage = null;
		if (percentage !== null) percentage /= 100;

		return new AssignmentScore(
			api,
			data.id != null ? +data.id : null,
			data.assignmentId != null ? +data.assignmentId : null,
			data.collected,
			data.late,
			data.missing,
			data.exempt,
			data.gradeBookType,
			data.comment,
			data.score,
			data.letterGrade,
			percentage != null ? +percentage : null,
			data.scoretype != null ? +data.scoretype : null
		);
	}
}
