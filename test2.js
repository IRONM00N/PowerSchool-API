// @ts-check
import rl from "node:readline/promises";
import PowerSchoolAPI from "./dist/index.js";
import credentials from "./test-credentials.json" assert { type: "json" };

const { url, username, password } = credentials;

const api = await new PowerSchoolAPI(url).setup();
const user = await api.login(username, password);
const student = (await user.getStudentsInfo())[0];

console.dir(user);

console.table(
	user?.studentData[0].finalGrades?.map((grade) => ({
		quarter: grade.reportingTerm.title,
		course: grade.course.title,
		teacher: grade.course.teacher.formattedName,
		date: grade.date?.toLocaleDateString(),
		grade: grade.grade,
		comment: grade.comment,
	}))
);
console.table(
	user?.studentData[0].attendanceRecords
		?.sort((a, b) => (a.date?.getTime() ?? 0) - (b.date?.getTime() ?? 0))
		.map((rec) => ({
			date: rec.date?.toLocaleDateString(),
			time: rec.date?.toLocaleTimeString(),
			period: rec.period?.name,
			code: rec.code?.code,
			codeDescription: rec.code?.description,
			comment: rec.comment,
			totalMinutes: rec.totalMinutes,
		}))
);

console.table(
	user?.studentData[0].courses
		?.sort((a, b) => (a.periodSort ?? 0) - (b.periodSort ?? 0))
		.map((course) => ({
			title: course.title,
			teacher: course.teacher.formattedName,
			room: course.roomName,
			term: course.term.title,
			description: course.description,
			finalGrade: course.finalGrade?.grade,
		}))
);

console.table(user?.studentData[0].reportingTerms);

for (const course of student.courses ?? []) {
	console.log(course.title);
	console.table(
		course.assignments.map((assignment) => ({
			dueDate: assignment.dueDate?.toLocaleDateString(),
			name: assignment.name,
			id: assignment.assignmentID,
			category: assignment.category.name,
			type: assignment.type,
			w8: assignment.weight,
			score: assignment.score?.score,
			c: assignment.score ? (assignment.score.collected ? "Y" : "N") : "N/A",
			l: assignment.score ? (assignment.score.late ? "Y" : "N") : "N/A",
			m: assignment.score ? (assignment.score.missing ? "Y" : "N") : "N/A",
			e: assignment.score ? (assignment.score.exempt ? "Y" : "N") : "N/A",
			psblePnts: assignment.possiblePoints,
			inclFnl: assignment.includeInFinalGrades,
			pdbd: assignment.publishDaysBeforeDue,
			pod: assignment.publishOnSpecificDate?.toLocaleDateString(),
			pubScores: assignment.publishScores,
			pubState: assignment.publishState,
		}))
	);
}

console.log("Latest Assignments");
console.table(
	student.assignmentCategories
		?.flatMap((c) => c.assignments)
		.sort((a, b) => (a.dueDate?.getTime() ?? 0) - (b.dueDate?.getTime() ?? 0))
		.slice(-20, -1)
		.map((assignment) => ({
			dueDate: assignment.dueDate?.toLocaleDateString(),
			course: assignment.course.title,
			name: assignment.name,
			// id: assignment.assignmentID,
			category: assignment.category.name,
			type: assignment.type,
			w8: assignment.weight,
			score: assignment.score?.score,
			// c: assignment.score ? (assignment.score.collected ? "Y" : "N") : "N/A",
			// l: assignment.score ? (assignment.score.late ? "Y" : "N") : "N/A",
			// m: assignment.score ? (assignment.score.missing ? "Y" : "N") : "N/A",
			// e: assignment.score ? (assignment.score.exempt ? "Y" : "N") : "N/A",
			psblePnts: assignment.possiblePoints,
			inclFnl: assignment.includeInFinalGrades,
			pdbd: assignment.publishDaysBeforeDue,
			pod: assignment.publishOnSpecificDate?.toLocaleDateString(),
			// pubScores: assignment.publishScores,
			// pubState: assignment.publishState,
		}))
);

const readline = rl.createInterface({ input: process.stdin, output: process.stdout });
