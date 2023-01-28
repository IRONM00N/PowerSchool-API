// @ts-check

import assert from "node:assert/strict";
import rl from "node:readline/promises";
import PowerSchoolAPI from "./dist/index.js";

// try to load test credentials from file if exists
let testCredentials = {};
try {
	// @ts-ignore
	testCredentials = (await import("./test-credentials.json", { assert: { type: "json" } })).default;
} catch (e) {}

const readline = rl.createInterface({ input: process.stdin, output: process.stdout });

// Get information from the user.
const url =
	testCredentials.url ||
	(await readline.question("Enter the PowerSchool installation URL (such as: http://sales.powerschool.com): "));
const username = testCredentials.username || (await readline.question("Enter your PowerSchool username: "));
const password = testCredentials.password || (await readline.question("Enter your PowerSchool password: "));
if (!url || !username || !password) throw new Error("Invalid information entered.");

// Create a new PowerSchool wrapper with our installation URL.
const api = await new PowerSchoolAPI(url).setup().catch(handleError("Couldn't load PowerSchool API"));

// Login to the user account with the provided credentials.
const user = await api.login(username, password).catch(handleError("Couldn't login PowerSchool user:"));

// If user is null, invalid credentials were provided.
assert(user, "Invalid credentials provided.");

// Otherwise, let's get the student's information.
const students = await user.getStudentsInfo().catch(handleError("Couldn't get more user info:"));

students.forEach((info) => {
	console.log(`Hey, ${info.student.getFormattedName()}!`);
	// Log the user's courses to console.
	console.log(
		`You're enrolled in ${info.courses.length} course${info.courses.length == 1 ? "" : "s"}${
			info.courses.length > 0 ? ":" : "."
		}`
	);
	console.log(
		info.courses
			.sort((a, b) => a.expression.localeCompare(b.expression))
			.map((course) => `- ${course.title} (${course.teacher.formattedName}) -- ${course.expression}`)
			.join("\n")
	);
});

readline.close();

/**
 * @param {string} msg
 */
function handleError(msg) {
	/**
	 * @return {never}
	 */
	return (err) => {
		console.error(msg, err);
		process.exit();
	};
}
