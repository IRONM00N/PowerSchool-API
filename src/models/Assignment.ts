import type PowerSchoolAPI from "..";
import { AssignmentVO } from "../types";
import type AssignmentCategory from "./AssignmentCategory";
import type AssignmentScore from "./AssignmentScore";
import type Course from "./Course";

/**
 * A PowerSchool assignment.
 */
export default class Assignment {
	private declare api: PowerSchoolAPI;

	/**
	 * The ID of this assignment.
	 */
	public declare id: number;

	/**
	 * The secondary ID of this assignment in the system.
	 */
	public declare assignmentID: number;

	/**
	 * The name of this assignment.
	 */
	public declare name: string | null;

	/**
	 * A shorter name for this assignment.
	 */
	public declare abbreviation: string | null;

	/**
	 * The category this assignment belongs to.
	 */
	public declare categoryID: number;

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
	 * The weight this assignment carries on the overall course mark.
	 */
	public declare weight: number;

	/**
	 * Whether or not this assignment's mark will influence the final grade in this course.
	 */
	public declare includeInFinalGrades: boolean;

	/**
	 * Whether scores for this assignment will be published or not.
	 */
	public declare publishScores: boolean;

	/**
	 * The specific date scores for this assignment will be published, if available.
	 */
	public declare publishOnSpecificDate: Date | null;

	/**
	 * The maximum number of points one can receive for this assignment.
	 */
	public declare possiblePoints: number;

	/**
	 * The number of days to publish this assignment before it is due.
	 */
	public declare publishDaysBeforeDue: number;

	/**
	 * If the assignment is published
	 */
	public declare publishState: number;

	//todo: what is this
	public declare courseDcID: number;

	/**
	 * The type of this assignment.
	 */
	public declare type: number;

	/**
	 * Get the score received on this assignment, if available.
	 */
	public get score(): AssignmentScore {
		return this.api._cachedInfo.assignmentScores[this.id];
	}

	/**
	 * Get the category this assignment belongs to.
	 */
	public get category(): AssignmentCategory {
		return this.api._cachedInfo.assignmentCategories[this.categoryID];
	}

	/**
	 * Get the course this assignment belongs to.
	 */
	public get course(): Course {
		return this.api._cachedInfo.courses[this.courseID];
	}

	/**
	 * @internal
	 */
	public constructor(
		api: PowerSchoolAPI,
		id: number,
		assignmentID: number,
		name: string | null,
		abbreviation: string | null,
		categoryID: number,
		courseID: number,
		description: string | null,
		dueDate: Date | null,
		gradeBookType: number,
		weight: number,
		includeInFinalGrades: boolean,
		publishScores: boolean,
		publishOnSpecificDate: Date | null,
		possiblePoints: number,
		publishDaysBeforeDue: number,
		publishState: number,
		courseDcID: number,
		type: number
	) {
		this.api = api ?? null;
		this.id = id ?? null;
		this.assignmentID = assignmentID ?? null;
		this.name = name ?? null;
		this.abbreviation = abbreviation ?? null;
		this.categoryID = categoryID ?? null;
		this.courseID = courseID ?? null;
		this.description = description ?? null;
		this.dueDate = dueDate ?? null;
		this.gradeBookType = gradeBookType ?? null;
		this.weight = weight ?? null;
		this.includeInFinalGrades = includeInFinalGrades ?? null;
		this.publishScores = publishScores ?? null;
		this.publishOnSpecificDate = publishOnSpecificDate ?? null;
		this.possiblePoints = possiblePoints ?? null;
		this.publishDaysBeforeDue = publishDaysBeforeDue ?? null;
		this.publishState = publishState ?? null;
		this.courseDcID = courseDcID ?? null;
		this.type = type ?? null;
	}

	/**
	 * @internal
	 */
	public static fromData(data: AssignmentVO, api: PowerSchoolAPI) {
		return new Assignment(
			api,
			data.id != null ? +data.id : null,
			data.assignmentid != null ? +data.assignmentid : null,
			data.name,
			data.abbreviation,
			data.categoryId != null ? +data.categoryId : null,
			data.sectionid != null ? +data.sectionid : null,
			data.description,
			data.dueDate ? new Date(data.dueDate) : null,
			data.gradeBookType != null ? +data.gradeBookType : null,
			data.weight != null ? +data.weight : null,
			data.includeinfinalgrades == 1,
			data.publishscores == 1,
			data.publishonspecificdate ? new Date(data.publishonspecificdate) : null,
			data.pointspossible != null ? +data.pointspossible : null,
			data.publishDaysBeforeDue != null ? +data.publishDaysBeforeDue : null,
			data.publishState != null ? +data.publishState : null,
			data.sectionDcid != null ? +data.sectionDcid : null,
			data.type != null ? +data.type : null
		);
	}
}
