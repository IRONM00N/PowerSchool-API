import { CacheInfo } from "..";
import { FinalGradeVO } from "../types";
import type Course from "./Course";
import type ReportingTerm from "./ReportingTerm";

/**
 * An object representing the final grade in a PowerSchool course.
 */
export default class FinalGrade {
	/**
	 * The API cache.
	 */
	private declare _cache: CacheInfo;

	/**
	 * The teacher's comment for this grade, if available.
	 */
	public declare comment: string | null;

	/**
	 * The identifier of the course this grade is from.
	 */
	public declare courseID: number;

	/**
	 * The date this mark was stored, if available.
	 */
	public declare date: Date | null;

	/**
	 * The grade received in this course, to be displayed.
	 */
	public declare grade: string | null;

	/**
	 * The ID of this event.
	 */
	public declare id: number;

	/**
	 * The grade received in this course as a percentage (value from 0-1), if can be calculated.
	 */
	public declare percentage: number;

	/**
	 * The identifier of the reporting term this grade is from.
	 */
	public declare reportingTermID: number;

	/**
	 * Get the course this grade is from.
	 */
	public get course(): Course {
		return this._cache.courses[this.courseID];
	}

	/**
	 * Get the reporting term this grade is from.
	 */
	public get reportingTerm(): ReportingTerm {
		return this._cache.reportingTerms[this.reportingTermID];
	}

	/**
	 * @internal
	 */
	public constructor(cache: CacheInfo, data: FinalGradeData) {
		this._cache = cache ?? null;
		this.comment = data.comment ?? null;
		this.courseID = data.courseID ?? null;
		this.date = data.date ?? null;
		this.grade = data.grade ?? null;
		this.id = data.id ?? null;
		this.percentage = data.percentage ?? null;
		this.reportingTermID = data.reportingTermID ?? null;
	}

	/**
	 * @internal
	 */
	public static fromData(data: FinalGradeVO, cache: CacheInfo) {
		return new FinalGrade(cache, {
			comment: data.commentValue,
			courseID: data.sectionid != null ? +data.sectionid : null!,
			date: data.dateStored ? new Date(data.dateStored) : null,
			grade: data.grade,
			id: data.id != null ? +data.id : null!,
			percentage: data.percent / 100,
			reportingTermID: data.reportingTermId != null ? +data.reportingTermId : null!,
		});
	}
}

export interface FinalGradeData {
	comment: string | null;
	courseID: number;
	date: Date | null;
	grade: string | null;
	id: number;
	percentage: number;
	reportingTermID: number;
}
