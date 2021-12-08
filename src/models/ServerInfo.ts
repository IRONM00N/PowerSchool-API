import { ServerInfo as RawServerInfo } from "../types";

/**
 * Information about the server.
 */
export default class ServerInfo {
	/**
	 * The API version of the server.
	 */
	public declare apiVersion: string | null;

	/**
	 * Whether or not the server is in daylight savings time.
	 */
	public declare dayLightSavings: number;

	/**
	 * The endpoint for the parent SAML login.
	 */
	public declare parentSAMLEndPoint: string | null;

	/**
	 * Whether or not the public portal is disabled.
	 */
	public declare publicPortalDisabled: boolean;

	/**
	 * The message to display when the public portal is disabled.
	 */
	public declare publicPortalDisabledMessage: string | null;

	/**
	 * The raw offset of the server time.
	 */
	public declare rawOffset: number;

	/**
	 * The server time.
	 */
	public declare serverTime: Date | null;

	/**
	 * The standard time zone name.
	 */
	public declare standardTimeZoneName: string | null;

	/**
	 * The endpoint for the student SAML login.
	 */
	public declare studentSAMLEndPoint: string | null;

	/**
	 * The endpoint for the teacher SAML login.
	 */
	public declare teacherSAMLEndPoint: string | null;

	/**
	 * The time zone name.
	 */
	public declare timeZoneName: string | null;

	/**
	 * @internal
	 */
	public constructor(data: ServerInfoData) {
		this.apiVersion = data.apiVersion ?? null;
		this.dayLightSavings = data.dayLightSavings ?? null;
		this.parentSAMLEndPoint = data.parentSAMLEndPoint ?? null;
		this.publicPortalDisabled = data.publicPortalDisabled ?? null;
		this.publicPortalDisabledMessage = data.publicPortalDisabledMessage ?? null;
		this.rawOffset = data.rawOffset ?? null;
		this.serverTime = data.serverTime ?? null;
		this.standardTimeZoneName = data.standardTimeZoneName ?? null;
		this.studentSAMLEndPoint = data.studentSAMLEndPoint ?? null;
		this.teacherSAMLEndPoint = data.teacherSAMLEndPoint ?? null;
		this.timeZoneName = data.timeZoneName ?? null;
	}

	/**
	 * @internal
	 */
	public static fromData(data: RawServerInfo) {
		return new ServerInfo({
			apiVersion: data.apiVersion,
			dayLightSavings: data.dayLightSavings,
			parentSAMLEndPoint: data.parentSAMLEndPoint,
			publicPortalDisabled: data.publicPortalDisabled,
			publicPortalDisabledMessage: data.publicPortalDisabledMessage,
			rawOffset: data.rawOffset,
			serverTime: data.serverTime != null ? new Date(data.serverTime) : null!,
			standardTimeZoneName: data.standardTimeZoneName,
			studentSAMLEndPoint: data.studentSAMLEndPoint,
			teacherSAMLEndPoint: data.teacherSAMLEndPoint,
			timeZoneName: data.timeZoneName,
		});
	}
}

export interface ServerInfoData {
	apiVersion: string | null;
	dayLightSavings: number;
	parentSAMLEndPoint: string | null;
	publicPortalDisabled: boolean;
	publicPortalDisabledMessage: string | null;
	rawOffset: number;
	serverTime: Date | null;
	standardTimeZoneName: string | null;
	studentSAMLEndPoint: string | null;
	teacherSAMLEndPoint: string | null;
	timeZoneName: string | null;
}
