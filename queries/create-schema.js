import fetchAPI from "./fetch_api.js";

export default async function getJobs(dataRegistryId, auth) {
  var data = await fetchAPI(`
    # Note: Use the dataRegistryId value from the createDataRegistry mutation.
    mutation createSchemaDraft {
      upsertSchemaDraft(input: {
        dataRegistryId: "${dataRegistryId}"
        majorVersion: 1
        schema: {
          type: "object",
          title: "onboarding-shuwei",
          required: [
            "userName",
            "email"
          ],
          properties: {
            userName: {
              type: "string"
            },
            email: {
              type: "string"
            },
            jobType: {
              type: "string"
            },
            jobResult: {
              type: "string"
            }
          },
          description: "RMS metadata pertaining to a Onboarding record type."      
        }
      }) {
        id
        majorVersion
        minorVersion
        status
        definition
      }
    }
  `, auth)

  return data?.upsertSchemaDraft
}
