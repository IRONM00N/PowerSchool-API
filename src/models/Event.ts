import { CacheInfo } from "..";
import { NotInSessionDayVO } from "../types";
import type School from "./School";

/**
 * A PowerSchool event, such as a not in session day.
 */
export default class Event {
	/**
	 * The API cache.
	 */
	private declare _cache: CacheInfo;

	/**
	 * The date of this event.
	 */
	public declare date: Date | null;

	/**
	 * The description for this event.
	 */
	public declare description: string | null;

	/**
	 * The ID of this event.
	 */
	public declare id: number;

	/**
	 * The number of the school this event is from.
	 */
	public declare schoolNumber: number | null;

	/**
	 * The type of this event to group together with others.
	 */
	public declare type: string | null;

	/**
	 * Get the school this event is from.
	 */
	public get school(): School {
		if (this.schoolNumber == null) throw new Error("schoolNumber is null");
		return this._cache.schools[this.schoolNumber];
	}

	/**
	 * @internal
	 */
	public constructor(cache: CacheInfo, data: EventsData) {
		this._cache = cache ?? null;
		this.date = data.date ?? null;
		this.description = data.description ?? null;
		this.id = data.id ?? null;
		this.schoolNumber = data.schoolNumber ?? null;
		this.type = data.type ?? null;
	}

	/**
	 * @internal
	 */
	public static fromData(data: NotInSessionDayVO, cache: CacheInfo) {
		return new Event(cache, {
			date: data.calendarDay ? new Date(data.calendarDay) : null,
			description: data.description,
			id: data.id != null ? +data.id : null!,
			schoolNumber: data.schoolNumber != null ? +data.schoolNumber : null,
			type: data.calType,
		});
	}
}

export interface EventsData {
	date: Date | null;
	description: string | null;
	id: number;
	schoolNumber: number | null;
	type: string | null;
}
