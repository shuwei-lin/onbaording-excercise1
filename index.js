
import createAdhocJob from "./queries/create-adhoc-job.js";
import createScheduledJob from "./queries/create-scheduled-job.js";
import getJobStatus from "./queries/get-job-status.js";
import axios from 'axios'
import fetchAPI from "./queries/fetch_api.js"
import getJobs from "./queries/getJobs.js";
import login from "./queries/login.js"

const GQL_URI = process.env.GQL_URI || 'https://api.dev.us-1.veritone.com/v3/graphql'   // defaults to DEV
const CLUSTER_ID = process.env.CLUSTER_ID || 'rt-9d7a5d1b-ffe0-4d71-a982-190522cdf273'  // defaults to DEV
const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD
let AUTH_TOKEN = process.env.AUTH_TOKEN

async function index() {


	var userLogin = await login();
	var auth = 'bearer ' + userLogin.token;


	// Exercise 1 ------------------------------------------------
	//var newAdhocJob = await createAdhocJob(auth);

	var newAdhocJobId = "22020612_zBczPp4IGL" //newAdhocJob.id

	console.log(newAdhocJobId)

	//var newScheduleJob = await createScheduledJob(auth);

	var newScheduleJobId = 139017 //newScheduleJob.id



	console.log(newAdhocJobId, newScheduleJobId)


	// Monitor jobs -----
	const monitorJobsPromise = new Promise(async (resolve, reject) => {
		await monitorJob(newAdhocJobId, auth, 1, resolve, reject)
	})
	await monitorJobsPromise
		.then(async data => {
			if (data.success) {
				console.log(`job completed with status of "${data.jobStatus}"`)
			} else {
				var msg = "job processed over 10 minutes. "
				console.log(msg)
				throw new Error(msg)
			}

		})

	// Exercise 2 ------------------------------------------------



}

async function monitorJob(jobId, auth, attempts, resolve, reject) {
	console.log(`attemps: ${attempts} of 120. (check every 5 seconds for 10 minutes)`)

	var adhocJob = await getJobStatus(jobId, auth)
	var adhocJobStatus = adhocJob.status

	if (adhocJobStatus !== 'complete' && adhocJobStatus !== 'failed' && adhocJobStatus !== 'cancelled') {
		if (attempts < 120) {
			setTimeout(() => {
				monitorJob(jobId, auth, attempts + 1, resolve, reject);
			}, 5000) // 5000 ms 
		}
		else {
			resolve({ success: false })
		}
	} else {
		resolve({ success: true, jobStatus: adhocJobStatus })
	}
}



// executions --------------------------------------------------
index();