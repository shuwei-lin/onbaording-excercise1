
import createAdhocJob from "./queries/create-adhoc-job.js";
import createScheduledJob from "./queries/create-scheduled-job.js";
import publishSchema from "./queries/publish_schema.js";
import createSchema from "./queries/create-schema.js";
import createDataRegistry from "./queries/create-data-registry.js";
import createTDOFolder from "./queries/create-tdo-folder.js";
import getJobStatus from "./queries/get-job-status.js";
import getJobs from "./queries/getJobs.js";
import login from "./queries/login.js"


async function index() {
	var userLogin = await login();
	var auth = 'bearer ' + userLogin.token;


	// Exercise 1 ------------------------------------------------
	var newAdhocJob = await createAdhocJob(auth);

	var newAdhocJobId = "22020612_zBczPp4IGL" //newAdhocJob.id

	console.log(newAdhocJobId)

	var newScheduleJob = await createScheduledJob(auth);

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


	// Create data registry
	var DataRegistry = await createDataRegistry(auth)
	var dataRegistryId = DataRegistry.id

	// Create Schema Draft
	var upsertSchemaDraft = await createSchema(dataRegistryId, auth)
	var schemaId = upsertSchemaDraft.id

	// publish Schema
	var SchemaState = await publishSchema(schemaId, auth)

	console.log(dataRegistryId, schemaId, SchemaState)


	// Create TDO Folder
	var createFolder = await createTDOFolder("5e017019-3b05-42af-9c56-6b690c0bc13f", auth) // the folder id is specific to user/organization
	var TDOFolderId = createFolder.id

	console.log(TDOFolderId)

	// move adhoc job to TDO folder


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