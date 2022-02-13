import fetchAPI from "./fetch_api.js";

export default async function createDataRegistry(auth) {
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
