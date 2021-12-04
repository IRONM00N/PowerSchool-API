import { TeacherVO } from "../types";

/**
 * A PowerSchool teacher object.
 */
export default class Teacher {
	/**
	 * The ID of this teacher.
	 */
	public declare id: number;

	/**
	 * The first name of this teacher.
	 */
	public declare firstName: string | null;

	/**
	 * The last name of this teacher.
	 */
	public declare lastName: string | null;

	/**
	 * The email of this teacher, if provided.
	 */
	public declare email: string | null;

	/**
	 * The phone of this teacher's school, if provided.
	 */
	public declare schoolPhone: string | null;

	/**
	 * @internal
	 */
	constructor(
		id: number,
		firstName: string | null,
		lastName: string | null,
		email: string | null,
		schoolPhone: string | null
	) {
		this.email = email ?? null;
		this.firstName = firstName ?? null;
		this.id = id ?? null;
		this.lastName = lastName ?? null;
		this.schoolPhone = schoolPhone ?? null;
	}

	/**
	 * @internal
	 */
	static fromData(data: TeacherVO) {
		return new Teacher(data.id != null ? +data.id : null!, data.firstName, data.lastName, data.email, data.schoolPhone);
	}

	/**
	 * Get the parts making up a teacher's name.
	 */
	public getNameParts(): string[] {
		if (!this.firstName) throw new Error("firstName is null");
		if (!this.lastName) throw new Error("lastName is null");
		return [this.firstName, this.lastName];
	}

	/**
	 * Get teacher's name formatted for display.
	 */
	public getFormattedName(): string {
		return this.getNameParts().join(" ");
	}
}
