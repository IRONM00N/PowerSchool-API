import { CacheInfo } from '..';
import { AttendanceVO } from "../types";
import type AttendanceCode from "./AttendanceCode";
import type Period from "./Period";
import type School from "./School";

/**
 * A PowerSchool attendance record, such as a deviation from normal attendance.
 */
export default class AttendanceRecord {
	private declare _cache: CacheInfo;

	/**
	 * The ID of this attendance code.
	 */
	public declare id: number;

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
	 * The number of the school this record was created by.
	 */
	public declare schoolNumber: number;

	/**
	 * The identifier of the period this record covers.
	 */
	public declare periodID: number;

	/**
	 * The identifier of the student this record involves.
	 */
	public declare studentID: number;

	/**
	 * The number of minutes this record accounts for, if not all (zero).
	 */
	public declare totalMinutes: number;

	/**
	 * Get the school this record belongs to.
	 */
	public get school(): School {
		return this._cache.schools[this.schoolNumber];
	}

	/**
	 * Get the period this record covers.
	 */
	public get period(): Period {
		return this._cache.periods[this.periodID];
	}

	/**
	 * Get the code of this record.
	 */
	public get code(): AttendanceCode {
		return this._cache.attendanceCodes[this.codeID];
	}

	/**
	 * @internal
	 */
	public constructor(
		cache: CacheInfo,
		id: number,
		codeID: number,
		comment: string | null,
		date: Date | null,
		schoolNumber: number,
		periodID: number,
		studentID: number,
		totalMinutes: number
	) {
		this._cache = cache ?? null;
		this.codeID = codeID ?? null;
		this.comment = comment ?? null;
		this.date = date ?? null;
		this.id = id ?? null;
		this.periodID = periodID ?? null;
		this.schoolNumber = schoolNumber ?? null;
		this.studentID = studentID ?? null;
		this.totalMinutes = totalMinutes ?? null;
	}

	/**
	 * @internal
	 */
	public static fromData(data: AttendanceVO, cache: CacheInfo) {
		return new AttendanceRecord(
			cache,
			data.id != null ? +data.id : null!,
			data.attCodeid != null ? +data.attCodeid : null!,
			data.attComment,
			data.attDate ? new Date(data.attDate) : null,
			data.schoolid != null ? +data.schoolid : null!,
			data.periodid != null ? +data.periodid : null!,
			data.studentid != null ? +data.studentid : null!,
			data.totalMinutes != null ? +data.totalMinutes : null!
		);
	}
}
