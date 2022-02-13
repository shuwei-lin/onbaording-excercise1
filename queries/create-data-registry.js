import fetchAPI from "./fetch_api.js";

export default async function getJobs(auth) {
  var data = await fetchAPI(`
    mutation createDataRegistry {
      createDataRegistry(
        input: {
          name: "Onboarding-aaudi-shuwei"
          description: "RMS metadata pertaining to onboarding."
          source: "field deprecated"
        }
      ) {
        id
      }
    }
  `, auth)

  return data?.createDataRegistry
}
