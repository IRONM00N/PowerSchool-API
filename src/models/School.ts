import type PowerSchoolAPI from "..";
import { DisabledFeaturesVO, SchoolVO } from "../types";
import type AttendanceCode from "./AttendanceCode";

/**
 * A PowerSchool school information object.
 */
export default class School {
	private declare api: PowerSchoolAPI;

	/**
	 * The abbreviation for the school.
	 */
	public declare abbreviation: string | null;

	/**
	 * The ID of this school.
	 */
	public declare id: number;

	/**
	 * The name of this school.
	 */
	public declare name: string | null;

	/**
	 * The number of this school.
	 */
	public declare schoolNumber: number;

	/**
	 * The school's address, formatted for display.
	 */
	public declare formattedAddress: string | null;

	/**
	 * The part's making up the school's address (such as street address, city, state/province, country, ZIP/postal code).
	 */
	public declare addressParts: PowerSchoolAddressParts;

	/**
	 * The school's phone number, formatted for display.
	 */
	public declare phone: string | null;

	/**
	 * The school's fax number, formatted for display.
	 */
	public declare fax: string | null;

	/**
	 * The lowest grade this school has.
	 */
	public declare lowGrade: number | null;

	/**
	 * The highest grade this school has.
	 */
	public declare highGrade: number | null;

	/**
	 * Whether or not the school is currently disabled.
	 */
	public declare disabled: boolean;

	/**
	 * Optional messages to display for the school if it is disabled (title and message keys in the object).
	 */
	public declare disabledMessage: PowerSchoolDisabledMessage | null;

	/**
	 * Features that are disabled on the school (object with true or false, on disabled status of each key).
	 */
	public declare disabledFeatures: DisabledFeatures | null;

	/**
	 * Get the attendance codes that belong to this school.
	 */
	public get attendanceCodes(): AttendanceCode[] {
		return Object.values(this.api._cachedInfo.attendanceCodes).filter(
			(c: any) => c.schoolNumber == this.schoolNumber
		) as AttendanceCode[];
	}

	/**
	 * @internal
	 */
	constructor(
		api: PowerSchoolAPI,
		id: number,
		name: string | null,
		schoolNumber: number,
		formattedAddress: string | null,
		addressParts: PowerSchoolAddressParts,
		phone: string | null,
		fax: string | null,
		lowGrade: number | null,
		highGrade: number | null,
		disabled: boolean,
		disabledMessage: PowerSchoolDisabledMessage | null,
		disabledFeatures: DisabledFeatures | null,
		abbreviation: string | null,
		currentTermId: number | null
	) {
		this.api = api ?? null;
		this.id = id ?? null;
		this.name = name ?? null;
		this.schoolNumber = schoolNumber ?? null;
		this.formattedAddress = formattedAddress ?? null;
		this.addressParts = addressParts ?? null;
		this.phone = phone ?? null;
		this.fax = fax ?? null;
		this.lowGrade = lowGrade ?? null;
		this.highGrade = highGrade ?? null;
		this.disabled = disabled ?? null;
		this.disabledMessage = disabledMessage ?? null;
		this.disabledFeatures = disabledFeatures ?? null;
		this.abbreviation = abbreviation ?? null;
	}

	/**
	 * @internal
	 */
	static fromData(data: SchoolVO, api: PowerSchoolAPI) {
		return new School(
			api,
			data.schoolId != null ? +data.schoolId : null,
			data.name,
			data.schoolNumber != null ? +data.schoolNumber : null,
			data.address,
			{
				streetAddress: data.schooladdress,
				city: data.schoolcity,
				state: data.schoolstate,
				country: data.schoolcountry,
				zip: data.schoolzip
			},
			data.schoolphone,
			data.schoolfax,
			data.lowGrade != null ? +data.lowGrade : null,
			data.highGrade != null ? +data.highGrade : null,
			data.schoolDisabled,
			data.schoolDisabledTitle || data.schoolDisabledMessage
				? { title: data.schoolDisabledTitle, message: data.schoolDisabledMessage }
				: null,
			data.disabledFeatures,
			data.abbreviation,
			data.currentTermId != null ? +data.currentTermId : null
		);
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
