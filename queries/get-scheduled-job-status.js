import fetchAPI from "./fetch_api.js";

export default async function getJobStatus(id, auth) {
  var data = await fetchAPI(`
    query scheduledJob {
      scheduledJob (id: ${id}) {
        id
        #organization
        name
        description
        startDateTime
        stopDateTime
        jobTemplateIds
        isActive
        createdDateTime
        
      }
    }
  `, auth)

  return data?.scheduledJob
}
