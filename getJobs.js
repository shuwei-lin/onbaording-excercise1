import fetchAPI from "./fetch_api.js";

export default async function getJobs(auth) {
  var data = await fetchAPI(`
    query {
      jobs {
        records {
          id
          status
          targetId
          clusterId
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
    }
  `, auth)

  return data?.jobs
}
