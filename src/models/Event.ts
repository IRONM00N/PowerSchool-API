import type PowerSchoolAPI from "..";
import { NotInSessionDayVO } from "../types";
import type School from "./School";

/**
 * A PowerSchool event, such as a not in session day.
 */
export default class Event {
	private declare api: PowerSchoolAPI;

	/**
	 * The ID of this event.
	 */
	public declare id: number;

	/**
	 * The type of this event to group together with others.
	 */
	public declare type: string | null;

	/**
	 * The date of this event.
	 */
	public declare date: Date | null;

	/**
	 * The description for this event.
	 */
	public declare description: string | null;

	/**
	 * The number of the school this event is from.
	 */
	public declare schoolNumber: number | null;

	/**
	 * Get the school this event is from.
	 */
	public get school(): School {
		if (!this.schoolNumber) throw new Error("schoolNumber is null");
		return this.api._cachedInfo.schools[this.schoolNumber];
	}

	/**
	 * @internal
	 */
	public constructor(
		api: PowerSchoolAPI,
		id: number,
		type: string | null,
		date: Date | null,
		description: string | null = null,
		schoolNumber: number | null = null
	) {
		this.api = api ?? null;
		this.id = id ?? null;
		this.type = type ?? null;
		this.date = date ?? null;
		this.description = description ?? null;
		this.schoolNumber = schoolNumber ?? null;
	}

	/**
	 * @internal
	 */
	public static fromData(data: NotInSessionDayVO, api: PowerSchoolAPI) {
		return new Event(
			api,
			data.id != null ? +data.id : null,
			data.calType,
			data.calendarDay ? new Date(data.calendarDay) : null,
			data.description,
			data.schoolNumber != null ? +data.schoolNumber : null
		);
	}
}
