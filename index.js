
import createAdhocJob from "./create-adhoc-job.js";
import fetchAPI from "./fetch_api.js"
import getJobs from "./getJobs.js";
import login from "./login.js"

async function index() {


	var userLogin = await login();
	var auth = 'bearer ' + userLogin.token;

	console.log(auth);

	var jobs = await getJobs(auth)

	console.log()

	var newJob = await createAdhocJob(auth);

	var newJobId = newJob.id

	console.log(newJobId)
}

//getData();

index();