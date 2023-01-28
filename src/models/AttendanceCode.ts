import { CacheInfo } from "../index.js";
import { AttendanceCodeVO } from "../types.js";
import type School from "./School.js";

/**
 * A code assigned to a PowerSchool attendance record.
 */
export default class AttendanceCode {
	/**
	 * The API cache.
	 */
	#cache: CacheInfo;

	/**
	 * The string representing this code.
	 */
	public declare code: string | null;

	/**
	 * A short description of this code.
	 */
	public declare description: string | null;

	/**
	 * The ID of this attendance code.
	 */
	public declare id: number;

	/**
	 * The number of the school this code belongs to.
	 */
	public declare schoolNumber: number;

	/**
	 * A number representing the order this code should appear in when sorted.
	 */
	public declare sortOrder: number | null;

	/**
	 * The type of this code.
	 */
	public declare type: number | null;

	/**
	 * The year ID this code is valid for.
	 */
	public declare yearID: number | null;

	/**
	 * Get the school this code belongs to.
	 */
	public get school(): School {
		return this.#cache.schools[this.schoolNumber];
	}

	/**
	 * @internal
	 */
	public constructor(cache: CacheInfo, data: AttendanceCodeData) {
		this.#cache = cache ?? null;
		this.code = data.code ?? null;
		this.description = data.description ?? null;
		this.id = data.id ?? null;
		this.schoolNumber = data.schoolNumber ?? null;
		this.sortOrder = data.sortOrder ?? null;
		this.type = data.type ?? null;
		this.yearID = data.yearID ?? null;
	}

	/**
	 * @internal
	 */
	public static fromData(data: AttendanceCodeVO, cache: CacheInfo) {
		return new AttendanceCode(cache, {
			code: data.attCode,
			description: data.description,
			id: data.id != null ? +data.id : null!,
			schoolNumber: data.schoolid != null ? +data.schoolid : null!,
			sortOrder: data.sortorder != null ? +data.sortorder : null,
			type: data.codeType != null ? +data.codeType : null,
			yearID: data.yearid != null ? +data.yearid : null,
		});
	}
}

export interface AttendanceCodeData {
	code: string | null;
	description: string | null;
	id: number;
	schoolNumber: number;
	sortOrder: number | null;
	type: number | null;
	yearID: number | null;
}
