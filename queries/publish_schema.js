import fetchAPI from "./fetch_api.js";

export default async function getJobs(id, auth) {
  var data = await fetchAPI(`
    # Note: Pass in the Schema ID for the id value
    mutation publishSchemaDraft {
      updateSchemaState(input: {
        id: "${id}"
        status: published
      }) {
        id
        majorVersion
        minorVersion
        status
      }
    }
  `, auth)

  return data?.updateSchemaState
}
