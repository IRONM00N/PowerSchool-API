import { TeacherVO } from "../types";

/**
 * A PowerSchool teacher object.
 */
export default class Teacher {
	/**
	 * The email of this teacher, if provided.
	 */
	public declare email: string | null;

	/**
	 * The first name of this teacher.
	 */
	public declare firstName: string | null;

	/**
	 * The ID of this teacher.
	 */
	public declare id: number;

	/**
	 * The last name of this teacher.
	 */
	public declare lastName: string | null;

	/**
	 * The phone of this teacher's school, if provided.
	 */
	public declare schoolPhone: string | null;

	/**
	 * Get teacher's name formatted for display.
	 */
	public get formattedName(): string {
		return this.nameParts.join(" ");
	}

	/**
	 * Get the parts making up a teacher's name.
	 */
	public get nameParts(): string[] {
		if (this.firstName == null) throw new Error("firstName is null");
		if (this.lastName == null) throw new Error("lastName is null");
		return [this.firstName, this.lastName];
	}

	/**
	 * @internal
	 */
	constructor(data: TeacherData) {
		this.email = data.email ?? null;
		this.firstName = data.firstName ?? null;
		this.id = data.id ?? null;
		this.lastName = data.lastName ?? null;
		this.schoolPhone = data.schoolPhone ?? null;
	}

	/**
	 * @internal
	 */
	static fromData(data: TeacherVO) {
		return new Teacher({
			email: data.email,
			firstName: data.firstName,
			id: data.id != null ? +data.id : null!,
			lastName: data.lastName,
			schoolPhone: data.schoolPhone,
		});
	}
}

export interface TeacherData {
	email: string | null;
	firstName: string | null;
	id: number;
	lastName: string | null;
	schoolPhone: string | null;
}
