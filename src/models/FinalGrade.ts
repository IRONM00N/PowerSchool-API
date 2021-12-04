import { CacheInfo } from '..';
import { FinalGradeVO } from "../types";
import type Course from "./Course";
import type ReportingTerm from "./ReportingTerm";

/**
 * An object representing the final grade in a PowerSchool course.
 */
export default class FinalGrade {
	private declare _cache: CacheInfo;

	/**
	 * The ID of this event.
	 */
	public declare id: number;

	/**
	 * The grade received in this course, to be displayed.
	 */
	public declare grade: string | null;

	/**
	 * The grade received in this course as a percentage (value from 0-1), if can be calculated.
	 */
	public declare percentage: number;

	/**
	 * The date this mark was stored, if available.
	 */
	public declare date: Date | null;

	/**
	 * The teacher's comment for this grade, if available.
	 */
	public declare comment: string | null;

	/**
	 * The identifier of the reporting term this grade is from.
	 */
	public declare reportingTermID: number;

	/**
	 * The identifier of the course this grade is from.
	 */
	public declare courseID: number;

	/**
	 * Get the reporting term this grade is from.
	 */
	public get reportingTerm(): ReportingTerm {
		return this._cache.reportingTerms[this.reportingTermID];
	}

	/**
	 * Get the course this grade is from.
	 */
	public get course(): Course {
		return this._cache.courses[this.courseID];
	}

	/**
	 * @internal
	 */
	public constructor(
		cache: CacheInfo,
		id: number,
		grade: string | null,
		percentage: number,
		date: Date | null,
		comment: string | null,
		reportingTermID: number,
		courseID: number
	) {
		this._cache = cache ?? null;
		this.comment = comment ?? null;
		this.courseID = courseID ?? null;
		this.date = date ?? null;
		this.grade = grade ?? null;
		this.id = id ?? null;
		this.percentage = percentage ?? null;
		this.reportingTermID = reportingTermID ?? null;
	}

	/**
	 * @internal
	 */
	public static fromData(data: FinalGradeVO, cache: CacheInfo) {
		return new FinalGrade(
			cache,
			data.id != null ? +data.id : null!,
			data.grade,
			data.percent / 100,
			data.dateStored ? new Date(data.dateStored) : null,
			data.commentValue,
			data.reportingTermId != null ? +data.reportingTermId : null!,
			data.sectionid != null ? +data.sectionid : null!
		);
	}
}
