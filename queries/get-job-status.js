import fetchAPI from "./fetch_api.js";

export default async function getJobStatus(id, auth) {
  var data = await fetchAPI(`
    query getJobStatus {
      job(id: "${id}") {
        id
        targetId
        clusterId
        status
        createdDateTime
          tasks {
            records {
              id
              engine {
                name
              }
              status
            }
          }
      }
    }
  `, auth)

  return data?.job
}
