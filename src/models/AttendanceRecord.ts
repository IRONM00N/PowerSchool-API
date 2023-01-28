import type { CacheInfo } from "../index.js";
import type { AttendanceVO } from "../types.js";
import type AttendanceCode from "./AttendanceCode.js";
import type Period from "./Period.js";
import type School from "./School.js";

/**
 * A PowerSchool attendance record, such as a deviation from normal attendance.
 */
export default class AttendanceRecord {
	/**
	 * The API cache.
	 */
	#cache: CacheInfo;

	/**
	 * The identifier for this attendance record's code.
	 */
	public declare codeID: number;

	/**
	 * A comment left with this record.
	 */
	public declare comment: string | null;

	/**
	 * The date the attendance for this record occurred on.
	 */
	public declare date: Date | null;

	/**
	 * The ID of this attendance code.
	 */
	public declare id: number;

	/**
	 * The identifier of the period this record covers.
	 */
	public declare periodID: number;

	/**
	 * The number of the school this record was created by.
	 */
	public declare schoolNumber: number;

	/**
	 * The identifier of the student this record involves.
	 */
	public declare studentID: number;

	/**
	 * The number of minutes this record accounts for, if not all (zero).
	 */
	public declare totalMinutes: number;

	/**
	 * Get the code of this record.
	 */
	public get code(): AttendanceCode {
		return this.#cache.attendanceCodes[this.codeID];
	}

	/**
	 * Get the period this record covers.
	 */
	public get period(): Period {
		return this.#cache.periods[this.periodID];
	}

	/**
	 * Get the school this record belongs to.
	 */
	public get school(): School {
		return this.#cache.schools[this.schoolNumber];
	}

	/**
	 * @internal
	 */
	public constructor(cache: CacheInfo, data: AttendanceRecordData) {
		this.#cache = cache ?? null;
		this.codeID = data.codeID ?? null;
		this.comment = data.comment ?? null;
		this.date = data.date ?? null;
		this.id = data.id ?? null;
		this.periodID = data.periodID ?? null;
		this.schoolNumber = data.schoolNumber ?? null;
		this.studentID = data.studentID ?? null;
		this.totalMinutes = data.totalMinutes ?? null;
	}

	/**
	 * @internal
	 */
	public static fromData(data: AttendanceVO, cache: CacheInfo) {
		return new AttendanceRecord(cache, {
			id: data.id != null ? +data.id : null!,
			codeID: data.attCodeid != null ? +data.attCodeid : null!,
			comment: data.attComment,
			date: data.attDate ? new Date(data.attDate) : null,
			schoolNumber: data.schoolid != null ? +data.schoolid : null!,
			periodID: data.periodid != null ? +data.periodid : null!,
			studentID: data.studentid != null ? +data.studentid : null!,
			totalMinutes: data.totalMinutes != null ? +data.totalMinutes : null!,
		});
	}
}

export interface AttendanceRecordData {
	codeID: number;
	comment: string | null;
	date: Date | null;
	id: number;
	periodID: number;
	schoolNumber: number;
	studentID: number;
	totalMinutes: number;
}
