import type { CacheInfo } from "../index.js";
import type { DisabledFeaturesVO, SchoolVO } from "../types.js";
import type AttendanceCode from "./AttendanceCode.js";

/**
 * A PowerSchool school information object.
 */
export default class School {
	/**
	 * The API cache.
	 */
	#cache: CacheInfo;

	/**
	 * The abbreviation for the school.
	 */
	public declare abbreviation: string | null;

	/**
	 * The part's making up the school's address (such as street address, city, state/province, country, ZIP/postal code).
	 */
	public declare addressParts: PowerSchoolAddressParts;

	/**
	 * The id of the current term.
	 */
	public declare currentTermId: number | null;

	/**
	 * Whether or not the school is currently disabled.
	 */
	public declare disabled: boolean;

	/**
	 * Features that are disabled on the school (object with true or false, on disabled status of each key).
	 */
	public declare disabledFeatures: DisabledFeatures;

	/**
	 * Optional messages to display for the school if it is disabled (title and message keys in the object).
	 */
	public declare disabledMessage: PowerSchoolDisabledMessage | null;

	/**
	 * The school's fax number, formatted for display.
	 */
	public declare fax: string | null;

	/**
	 * The school's address, formatted for display.
	 */
	public declare formattedAddress: string | null;

	/**
	 * The highest grade this school has.
	 */
	public declare highGrade: number | null;

	/**
	 * The ID of this school.
	 */
	public declare id: number;

	/**
	 * The lowest grade this school has.
	 */
	public declare lowGrade: number | null;

	/**
	 * The name of this school.
	 */
	public declare name: string | null;

	/**
	 * The school's phone number, formatted for display.
	 */
	public declare phone: string | null;

	/**
	 * The number of this school.
	 */
	public declare schoolNumber: number;

	/**
	 * Get the attendance codes that belong to this school.
	 */
	public get attendanceCodes(): AttendanceCode[] {
		return Object.values(this.#cache.attendanceCodes).filter(
			(c: any) => c.schoolNumber == this.schoolNumber
		) as AttendanceCode[];
	}

	/**
	 * @internal
	 */
	constructor(cache: CacheInfo, data: SchoolData) {
		this.#cache = cache ?? null;
		this.abbreviation = data.abbreviation ?? null;
		this.addressParts = data.addressParts ?? null;
		this.currentTermId = data.currentTermId ?? null;
		this.disabled = data.disabled ?? null;
		this.disabledFeatures = data.disabledFeatures ?? null;
		this.disabledMessage = data.disabledMessage ?? null;
		this.fax = data.fax ?? null;
		this.formattedAddress = data.formattedAddress ?? null;
		this.highGrade = data.highGrade ?? null;
		this.id = data.id ?? null;
		this.lowGrade = data.lowGrade ?? null;
		this.name = data.name ?? null;
		this.phone = data.phone ?? null;
		this.schoolNumber = data.schoolNumber ?? null;
	}

	/**
	 * @internal
	 */
	static fromData(data: SchoolVO, cache: CacheInfo) {
		const disabledFeatures = {} as DisabledFeaturesVO;
		for (const [key, value] of Object.entries(data.disabledFeatures ?? {})) {
			if (key !== "attributes") disabledFeatures[key as keyof DisabledFeaturesVO] = value;
		}

		return new School(cache, {
			abbreviation: data.abbreviation,
			addressParts: {
				streetAddress: data.schooladdress ?? null,
				city: data.schoolcity ?? null,
				state: data.schoolstate ?? null,
				country: data.schoolcountry ?? null,
				zip: data.schoolzip ?? null,
			},
			currentTermId: data.currentTermId != null ? +data.currentTermId : null,
			disabled: data.schoolDisabled,
			disabledFeatures: disabledFeatures,
			disabledMessage:
				data.schoolDisabledTitle || data.schoolDisabledMessage
					? { title: data.schoolDisabledTitle, message: data.schoolDisabledMessage }
					: null,
			fax: data.schoolfax,
			formattedAddress: data.address,
			highGrade: data.highGrade != null ? +data.highGrade : null,
			id: data.schoolId != null ? +data.schoolId : null!,
			lowGrade: data.lowGrade != null ? +data.lowGrade : null,
			name: data.name,
			phone: data.schoolphone,
			schoolNumber: data.schoolNumber != null ? +data.schoolNumber : null!,
		});
	}
}

export interface PowerSchoolAddressParts {
	streetAddress: string | null;
	city: string | null;
	state: string | null;
	country: string | null;
	zip: string | null;
}

export interface PowerSchoolDisabledMessage {
	title: string | null;
	message: string | null;
}

export type DisabledFeatures = DisabledFeaturesVO;

export interface SchoolData {
	abbreviation: string | null;
	addressParts: PowerSchoolAddressParts;
	currentTermId: number | null;
	disabled: boolean;
	disabledFeatures: DisabledFeatures;
	disabledMessage: PowerSchoolDisabledMessage | null;
	fax: string | null;
	formattedAddress: string | null;
	highGrade: number | null;
	id: number;
	lowGrade: number | null;
	name: string | null;
	phone: string | null;
	schoolNumber: number;
}
