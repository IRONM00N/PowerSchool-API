// @ts-check
"use strict";

(async () => {
	const PowerSchoolAPI = require("./dist/index").default;
	const { url, username, password } = require("./test-credentials.json");

	const api = await new PowerSchoolAPI(url).setup();
	const user = await api.login(username, password);
	const student = (await user.getStudentsInfo())[0];

	console.dir(user.session)

})();
