import type { Locale, UserSessionVO } from "../types.js";
import ServerInfo from "./ServerInfo.js";
import { parseArray } from "./User.js";

/**
 * The user's session information.
 */
export default class UserSession {
	/**
	 * The locale of the session.
	 */
	public declare locale: Locale | null;

	/**
	 * The current time on the server.
	 */
	public declare serverCurrentTime: Date | null;

	/**
	 * The server info.
	 */
	public declare serverInfo: ServerInfo | null;

	/**
	 * The service ticket.
	 */
	public declare serviceTicket: string | null;

	/**
	 * The student IDs.
	 */
	public declare studentIDs: number[] | null;

	/**
	 * The UC profile URIs.
	 */
	public declare ucProfileURIs: string[] | null;

	/**
	 * The UC token.
	 */
	public declare ucToken: string | null;

	/**
	 * The user ID.
	 */
	public declare userID: number;

	/**
	 * The user type.
	 */
	public declare userType: number;

	/**
	 * @internal
	 */
	constructor(data: UserSessionData) {
		this.locale = data.locale ?? null;
		this.serverCurrentTime = data.serverCurrentTime ?? null;
		this.serverInfo = data.serverInfo ?? null;
		this.serviceTicket = data.serviceTicket ?? null;
		this.studentIDs = data.studentIDs ?? null;
		this.ucProfileURIs = data.ucProfileURIs ?? null;
		this.ucToken = data.ucToken ?? null;
		this.userID = data.userID ?? null;
		this.userType = data.userType ?? null;
	}

	/**
	 * @internal
	 */
	public static fromData(data: UserSessionVO) {
		return new UserSession({
			locale: data.locale,
			serverCurrentTime: data.serverCurrentTime != null ? new Date(data.serverCurrentTime) : null,
			serverInfo: data.serverInfo != null ? new ServerInfo(data.serverInfo) : null,
			serviceTicket: data.serviceTicket,
			studentIDs: parseArray(data.studentIDs),
			ucProfileURIs: parseArray(data.ucProfileURIs),
			ucToken: data.ucToken,
			userID: data.userId != null ? +data.userId : null!,
			userType: data.userType != null ? +data.userType : null!,
		});
	}
}

export interface UserSessionData {
	locale: Locale | null;
	serverCurrentTime: Date | null;
	serverInfo: ServerInfo | null;
	serviceTicket: string | null;
	studentIDs: number[] | null;
	ucProfileURIs: string[] | null;
	ucToken: string | null;
	userID: number;
	userType: number;
}
