import type PowerSchoolAPI from "..";
import { AttendanceCodeVO } from "../types";
import type School from "./School";

/**
 * A code assigned to a PowerSchool attendance record.
 */
export default class AttendanceCode {
	private declare api: PowerSchoolAPI;

	/**
	 * The ID of this attendance code.
	 */
	public declare id: number;

	/**
	 * The string representing this code.
	 */
	public declare code: string | null;

	/**
	 * A short description of this code.
	 */
	public declare description: string | null;

	/**
	 * The type of this code.
	 */
	public declare type: number | null;

	/**
	 * The number of the school this code belongs to.
	 */
	public declare schoolNumber: number;

	/**
	 * A number representing the order this code should appear in when sorted.
	 */
	public declare sortOrder: number | null;

	/**
	 * The year ID this code is valid for.
	 */
	public declare yearID: number | null;

	/**
	 * Get the school this code belongs to.
	 */
	public get school(): School {
		return this.api._cachedInfo.schools[this.schoolNumber];
	}

	/**
	 * @internal
	 */
	public constructor(
		api: PowerSchoolAPI,
		id: number,
		code: string | null,
		description: string | null,
		type: number | null,
		schoolNumber: number,
		sortOrder: number | null,
		yearID: number | null
	) {
		this.api = api ?? null;
		this.id = id ?? null;
		this.code = code ?? null;
		this.description = description ?? null;
		this.type = type ?? null;
		this.schoolNumber = schoolNumber ?? null;
		this.sortOrder = sortOrder ?? null;
		this.yearID = yearID ?? null;
	}

	/**
	 * @internal
	 */
	public static fromData(data: AttendanceCodeVO, api: PowerSchoolAPI) {
		return new AttendanceCode(
			api,
			data.id != null ? +data.id : null,
			data.attCode,
			data.description,
			data.codeType != null ? +data.codeType : null,
			data.schoolid != null ? +data.schoolid : null,
			data.sortorder != null ? +data.sortorder : null,
			data.yearid != null ? +data.yearid : null
		);
	}
}
