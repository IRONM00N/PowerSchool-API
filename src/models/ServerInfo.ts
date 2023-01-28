import type { ServerInfo as ServerInfoData } from "../types.js";

/**
 * Information about the server.
 */
export default class ServerInfo {
	#data: ServerInfoData;

	/**
	 * The API version of the server.
	 */
	public get apiVersion(): string | null {
		return this.#data.apiVersion ?? null;
	}

	/**
	 * Whether or not the server is in daylight savings time.
	 */
	public get dayLightSavings(): number {
		return this.#data.dayLightSavings ?? null;
	}

	/**
	 * The endpoint for the parent SAML login.
	 */
	public get parentSAMLEndPoint(): string | null {
		return this.#data.parentSAMLEndPoint ?? null;
	}

	/**
	 * Whether or not the public portal is disabled.
	 */
	public get publicPortalDisabled(): boolean {
		return this.#data.publicPortalDisabled ?? null;
	}

	/**
	 * The message to display when the public portal is disabled.
	 */
	public get publicPortalDisabledMessage(): string | null {
		return this.#data.publicPortalDisabledMessage ?? null;
	}

	/**
	 * The raw offset of the server time.
	 */
	public get rawOffset(): number {
		return this.#data.rawOffset ?? null;
	}

	/**
	 * The server time.
	 */
	public get serverTime(): Date | null {
		return this.#data.serverTime != null ? new Date(this.#data.serverTime) : null;
	}

	/**
	 * The standard time zone name.
	 */
	public get standardTimeZoneName(): string | null {
		return this.#data.standardTimeZoneName ?? null;
	}

	/**
	 * The endpoint for the student SAML login.
	 */
	public get studentSAMLEndPoint(): string | null {
		return this.#data.studentSAMLEndPoint ?? null;
	}

	/**
	 * The endpoint for the teacher SAML login.
	 */
	public get teacherSAMLEndPoint(): string | null {
		return this.#data.teacherSAMLEndPoint ?? null;
	}

	/**
	 * The time zone name.
	 */
	public get timeZoneName(): string | null {
		return this.#data.timeZoneName ?? null;
	}

	/**
	 * @internal
	 */
	public constructor(data: ServerInfoData) {
		this.#data = data;
	}
}
