import type AssignmentCategory from "./AssignmentCategory";
import type AttendanceCode from "./AttendanceCode";
import type AttendanceRecord from "./AttendanceRecord";
import type Course from "./Course";
import type Event from "./Event";
import type FinalGrade from "./FinalGrade";
import type Period from "./Period";
import type ReportingTerm from "./ReportingTerm";
import type School from "./School";
import type Student from "./Student";
import type Teacher from "./Teacher";
import type Term from "./Term";

/**
 * Holds information about the student.
 */
export default class StudentInfo {
	/**
	 * The student's assignments, sorted into categories
	 */
	public declare assignmentCategories: AssignmentCategory[] | null;

	/**
	 * The student's available attendance codes.
	 */
	public declare attendanceCodes: AttendanceCode[] | null;

	/**
	 * The student's attendance records (deviations from normal attendance).
	 */
	public declare attendanceRecords: AttendanceRecord[] | null;

	/**
	 * The student's current courses.
	 */
	public declare courses: Course[] | null;

	/**
	 * The student's final grades.
	 */
	public declare finalGrades: FinalGrade[] | null;

	/**
	 * The student's days where school isn't in session.
	 */
	public declare notInSessionDays: Event[] | null;

	/**
	 * The student's available periods.
	 */
	public declare periods: Period[] | null;

	/**
	 * The student's reporting terms.
	 */
	public declare reportingTerms: ReportingTerm[] | null;

	/**
	 * The student's school.
	 */
	public declare schools: School[] | null;

	/**
	 * An object holding basic information about this student.
	 */
	public declare student: Student | null;

	/**
	 * The student's teachers.
	 */
	public declare teachers: Teacher[] | null;

	/**
	 * The student's available terms.
	 */
	public declare terms: Term[] | null;

	/**
	 * The student's current year ID.
	 */
	public declare yearID: number | null;

	/**
	 * @internal
	 */
	constructor() {
		this.assignmentCategories = null;
		this.attendanceCodes = null;
		this.attendanceRecords = null;
		this.courses = null;
		this.finalGrades = null;
		this.notInSessionDays = null;
		this.periods = null;
		this.reportingTerms = null;
		this.schools = null;
		this.student = null;
		this.teachers = null;
		this.terms = null;
		this.yearID = null;
	}
}
