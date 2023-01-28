import type { CacheInfo } from "../index.js";
import type { AssignmentVO } from "../types.js";
import type AssignmentCategory from "./AssignmentCategory.js";
import type AssignmentScore from "./AssignmentScore.js";
import type Course from "./Course.js";

/**
 * A PowerSchool assignment.
 */
export default class Assignment {
	/**
	 * The API cache.
	 */
	#cache: CacheInfo;
	#data: AssignmentVO;

	/**
	 * A shorter name for this assignment.
	 */
	public declare abbreviation: string | null;

	/**
	 * The secondary ID of this assignment in the system.
	 */
	public declare assignmentID: number;

	/**
	 * The category this assignment belongs to.
	 */
	public declare categoryID: number;

	/**
	 * The DCID of the category this assignment belongs to.
	 */
	public declare courseDCID: number;

	/**
	 * The course this assignment belongs to.
	 */
	public declare courseID: number;

	/**
	 * The description of this assignment, if available.
	 */
	public declare description: string | null;

	/**
	 * The due date of this assignment.
	 */
	public declare dueDate: Date | null;

	/**
	 * The grade book type for this assignment.
	 */
	public declare gradeBookType: number;

	/**
	 * The ID of this assignment.
	 */
	public declare id: number;

	/**
	 * Whether or not this assignment's mark will influence the final grade in this course.
	 */
	public declare includeInFinalGrades: boolean;

	/**
	 * The name of this assignment.
	 */
	public declare name: string | null;

	/**
	 * The maximum number of points one can receive for this assignment.
	 */
	public declare possiblePoints: number;

	/**
	 * The number of days to publish this assignment before it is due.
	 */
	public declare publishDaysBeforeDue: number;

	/**
	 * The specific date scores for this assignment will be published, if available.
	 */
	public declare publishOnSpecificDate: Date | null;

	/**
	 * Whether scores for this assignment will be published or not.
	 */
	public declare publishScores: boolean;

	/**
	 * If the assignment is published
	 */
	public declare publishState: number;

	/**
	 * The type of this assignment.
	 */
	public declare type: number;

	/**
	 * The weight this assignment carries on the overall course mark.
	 */
	public declare weight: number;

	/**
	 * Get the score received on this assignment, if available.
	 */
	public get score(): AssignmentScore {
		return this.#cache.assignmentScores[this.id];
	}

	/**
	 * Get the category this assignment belongs to.
	 */
	public get category(): AssignmentCategory {
		return this.#cache.assignmentCategories[this.categoryID];
	}

	/**
	 * Get the course this assignment belongs to.
	 */
	public get course(): Course {
		return this.#cache.courses[this.courseID];
	}

	/**
	 * @internal
	 */
	public constructor(cache: CacheInfo, data: AssignmentData, raw: AssignmentVO) {
		this.#cache = cache ?? null;
		this.abbreviation = data.abbreviation ?? null;
		this.assignmentID = data.assignmentID ?? null;
		this.categoryID = data.categoryID ?? null;
		this.courseDCID = data.courseDCID ?? null;
		this.courseID = data.courseID ?? null;
		this.description = data.description ?? null;
		this.dueDate = data.dueDate ?? null;
		this.gradeBookType = data.gradeBookType ?? null;
		this.id = data.id ?? null;
		this.includeInFinalGrades = data.includeInFinalGrades ?? null;
		this.name = data.name ?? null;
		this.possiblePoints = data.possiblePoints ?? null;
		this.publishDaysBeforeDue = data.publishDaysBeforeDue ?? null;
		this.publishOnSpecificDate = data.publishOnSpecificDate ?? null;
		this.publishScores = data.publishScores ?? null;
		this.publishState = data.publishState ?? null;
		this.type = data.type ?? null;
		this.weight = data.weight ?? null;
		this.#data = raw;
	}

	public toString(): string {
		return this.name ?? "";
	}

	/**
	 * @internal
	 */
	public static fromData(data: AssignmentVO, cache: CacheInfo) {
		return new Assignment(
			cache,
			{
				abbreviation: data.abbreviation,
				assignmentID: data.assignmentid != null ? +data.assignmentid : null!,
				categoryID: data.categoryId != null ? +data.categoryId : null!,
				courseDCID: data.sectionDcid != null ? +data.sectionDcid : null!,
				courseID: data.sectionid != null ? +data.sectionid : null!,
				description: data.description,
				dueDate: data.dueDate ? new Date(data.dueDate) : null,
				gradeBookType: data.gradeBookType != null ? +data.gradeBookType : null!,
				id: data.id != null ? +data.id : null!,
				includeInFinalGrades: data.includeinfinalgrades == 1,
				name: data.name,
				possiblePoints: data.pointspossible != null ? +data.pointspossible : null!,
				publishDaysBeforeDue: data.publishDaysBeforeDue != null ? +data.publishDaysBeforeDue : null!,
				publishOnSpecificDate: data.publishonspecificdate ? new Date(data.publishonspecificdate) : null,
				publishScores: data.publishscores == 1,
				publishState: data.publishState != null ? +data.publishState : null!,
				type: data.type != null ? +data.type : null!,
				weight: data.weight != null ? +data.weight : null!,
			},
			data
		);
	}
}

export interface AssignmentData {
	abbreviation: string | null;
	assignmentID: number;
	categoryID: number;
	courseDCID: number;
	courseID: number;
	description: string | null;
	dueDate: Date | null;
	gradeBookType: number;
	id: number;
	includeInFinalGrades: boolean;
	name: string | null;
	possiblePoints: number;
	publishDaysBeforeDue: number;
	publishOnSpecificDate: Date | null;
	publishScores: boolean;
	publishState: number;
	type: number;
	weight: number;
}
