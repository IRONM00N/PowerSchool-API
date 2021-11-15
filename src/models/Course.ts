import type PowerSchoolAPI from "..";
import { SectionVO } from "../types";
import type Assignment from "./Assignment";
import type FinalGrade from "./FinalGrade";
import type School from "./School";
import type Teacher from "./Teacher";
import type Term from "./Term";

/**
 * A PowerSchool course.
 */
export default class Course {
	private declare api: PowerSchoolAPI;

	/**
	 * The ID of this course.
	 */
	public declare id: number;

	/**
	 * The title of this course.
	 */
	public declare title: string | null;

	/**
	 * The code of this course.
	 */
	public declare code: string | null;

	/**
	 * The number of the school this course is from.
	 */
	public declare schoolNumber: number;

	/**
	 * The ID of the term this course is a part of.
	 */
	public declare termID: number;

	/**
	 * A number to use to sort this period among others.
	 */
	public declare periodSort: number | null;

	/**
	 * The name of the room this course takes place in.
	 */
	public declare roomName: string | null;

	/**
	 * The number of the section this course is in.
	 */
	public declare sectionNumber: string | null;

	/**
	 * The ID of the teacher teaching this course.
	 */
	public declare teacherID: number;

	/**
	 * An expression to use to sort this course's period among others.
	 */
	public declare expression: string | null;

	/**
	 * The coursebook type of this course.
	 */
	public declare gradeBookType: number;

	/**
	 * The description text of this course.
	 */
	public declare description: string | null;

	/**
	 * Get the term this course is a part of.
	 */
	public get term(): Term {
		return this.api._cachedInfo.terms[this.termID];
	}

	/**
	 * Get the school this course is from.
	 */
	public get school(): School {
		return this.api._cachedInfo.schools[this.schoolNumber];
	}

	/**
	 * Get the teacher teaching this course.
	 */
	public get teacher(): Teacher {
		return this.api._cachedInfo.teachers[this.teacherID];
	}

	/**
	 * Get the final grade received in this course, if available.
	 */
	public get finalGrade(): FinalGrade {
		return this.api._cachedInfo.finalGrades[this.id];
	}

	/**
	 * Get any assignments associated with this course.
	 *
	 * **NOTE:** This getter filters through all assignments every time it is called, so use it sparingly.
	 */
	public get assignments(): Assignment[] {
		return Object.values(this.api._cachedInfo.assignments).filter((a: any) => a.courseID == this.id) as Assignment[];
	}

	/**
	 * @internal
	 */
	public constructor(
		api: PowerSchoolAPI,
		id: number,
		title: string | null,
		code: string | null,
		schoolNumber: number,
		termID: number,
		periodSort: number | null,
		roomName: string | null,
		sectionNumber: string | null,
		teacherID: number,
		expression: string | null,
		gradeBookType: number,
		description: string | null = null
	) {
		this.api = api ?? null;
		this.id = id ?? null;
		this.title = title ?? null;
		this.code = code ?? null;
		this.schoolNumber = schoolNumber ?? null;
		this.termID = termID ?? null;
		this.periodSort = periodSort ?? null;
		this.roomName = roomName ?? null;
		this.sectionNumber = sectionNumber ?? null;
		this.teacherID = teacherID ?? null;
		this.expression = expression ?? null;
		this.gradeBookType = gradeBookType ?? null;
		this.description = description ?? null;
	}

	/**
	 * @internal
	 */
	public static fromData(data: SectionVO, api: PowerSchoolAPI) {
		return new Course(
			api,
			data.id != null ? +data.id : null,
			data.schoolCourseTitle,
			data.courseCode,
			data.schoolNumber != null ? +data.schoolNumber : null,
			data.termID != null ? +data.termID : null,
			data.periodSort != null ? +data.periodSort : null,
			data.roomName,
			data.sectionNum,
			data.teacherID != null ? +data.teacherID : null,
			data.expression,
			data.gradeBookType != null ? +data.gradeBookType : null,
			data.description
		);
	}
}
