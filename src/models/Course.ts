import type { CacheInfo } from "../index.js";
import type { SectionVO, StartStopDateVO } from "../types.js";
import type Assignment from "./Assignment.js";
import type FinalGrade from "./FinalGrade.js";
import type School from "./School.js";
import type Teacher from "./Teacher.js";
import type Term from "./Term.js";

/**
 * A PowerSchool course.
 */
export default class Course {
	/**
	 * The API cache.
	 */
	#cache: CacheInfo;

	/**
	 * The code of this course.
	 */
	public declare code: string | null;

	/**
	 * The DCID of this course.
	 */
	public declare DCID: number;

	/**
	 * The description text of this course.
	 */
	public declare description: string | null;

	/**
	 * The enrollments of this course.
	 */
	public declare enrollments: CourseEnrollment[] | null;

	/**
	 * An expression to use to sort this course's period among others.
	 */
	public declare expression: string | null;

	/**
	 * The coursebook type of this course.
	 */
	public declare gradeBookType: number;

	/**
	 * The ID of this course.
	 */
	public declare id: number;

	/**
	 * A number to use to sort this period among others.
	 */
	public declare periodSort: number | null;

	/**
	 * The name of the room this course takes place in.
	 */
	public declare roomName: string | null;

	/**
	 * The number of the school this course is from.
	 */
	public declare schoolNumber: number;

	/**
	 * The number of the section this course is in.
	 */
	public declare sectionNumber: string | null;

	/**
	 * The start and stop dates of this course
	 */
	public declare startStopDates: StartStopDates[] | null;

	/**
	 * The ID of the teacher teaching this course.
	 */
	public declare teacherID: number;

	/**
	 * The ID of the term this course is a part of.
	 */
	public declare termID: number;

	/**
	 * The title of this course.
	 */
	public declare title: string | null;

	/**
	 * Get any assignments associated with this course.
	 *
	 * **NOTE:** This getter filters through all assignments every time it is called, so use it sparingly.
	 */
	public get assignments(): Assignment[] {
		return Object.values(this.#cache.assignments).filter((a: any) => a.courseID == this.id) as Assignment[];
	}

	/**
	 * Get the final grade received in this course, if available.
	 */
	public get finalGrade(): FinalGrade {
		return this.#cache.finalGrades[this.id];
	}

	/**
	 * Get the teacher teaching this course.
	 */
	public get teacher(): Teacher {
		return this.#cache.teachers[this.teacherID];
	}

	/**
	 * Get the term this course is a part of.
	 */
	public get term(): Term {
		return this.#cache.terms[this.termID];
	}

	/**
	 * Get the school this course is from.
	 */
	public get school(): School {
		return this.#cache.schools[this.schoolNumber];
	}

	/**
	 * @internal
	 */
	public constructor(api: CacheInfo, data: CourseData) {
		this.#cache = api ?? null;
		this.code = data.code ?? null;
		this.DCID = data.DCID ?? null;
		this.description = data.description ?? null;
		this.enrollments = data.enrollments ?? null;
		this.expression = data.expression ?? null;
		this.gradeBookType = data.gradeBookType ?? null;
		this.id = data.id ?? null;
		this.periodSort = data.periodSort ?? null;
		this.roomName = data.roomName ?? null;
		this.schoolNumber = data.schoolNumber ?? null;
		this.sectionNumber = data.sectionNumber ?? null;
		this.startStopDates = data.startStopDates ?? null;
		this.teacherID = data.teacherID ?? null;
		this.termID = data.termID ?? null;
		this.title = data.title ?? null;
	}

	/**
	 * @internal
	 */
	public static fromData(data: SectionVO, api: CacheInfo) {
		return new Course(api, {
			code: data.courseCode,
			DCID: data.dcid != null ? +data.dcid : null!,
			description: data.description,
			enrollments: parseObjArr(data.enrollments, ["id"]),
			expression: data.expression,
			gradeBookType: data.gradeBookType != null ? +data.gradeBookType : null!,
			id: data.id != null ? +data.id : null!,
			periodSort: data.periodSort != null ? +data.periodSort : null,
			roomName: data.roomName,
			schoolNumber: data.schoolNumber != null ? +data.schoolNumber : null!,
			sectionNumber: data.sectionNum,
			startStopDates: parseObjArr(data.startStopDates, ["sectionEnrollmentId"]),
			teacherID: data.teacherID != null ? +data.teacherID : null!,
			termID: data.termID != null ? +data.termID : null!,
			title: data.schoolCourseTitle,
		});
	}
}

export interface CourseData {
	code: string | null;
	DCID: number;
	description: string | null;
	enrollments: CourseEnrollment[] | null;
	expression: string | null;
	gradeBookType: number;
	id: number;
	periodSort: number | null;
	roomName: string | null;
	schoolNumber: number;
	sectionNumber: string | null;
	startStopDates: StartStopDateVO[] | null;
	teacherID: number;
	termID: number;
	title: string | null;
}

function parseObjArr<T extends {} | null>(data: T | T[], keyToNum: string[] = []): T extends null ? never : T[] {
	if (!data) return [] as unknown as T extends null ? never : T[];
	const array = Array.isArray(data) ? [...data] : [{ ...data }];
	for (const element of array) {
		if ("attributes" in <any>element) delete (<any>element)["attributes"];
		for (const key of keyToNum) {
			if (key in <any>element) (<any>element)[key] = (<any>element)[key] != null ? +(<any>element)[key] : null;
		}
	}
	return array as unknown as T extends null ? never : T[];
}

export interface CourseEnrollment {
	endDate: Date | null;
	enrollStatus: number;
	id: number;
	startDate: Date | null;
}

export interface StartStopDates {
	sectionEnrollmentId: number;
	start: Date | null;
	stop: Date | null;
}
