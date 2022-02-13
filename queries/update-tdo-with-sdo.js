import fetchAPI from "./fetch_api.js";

export default async function updateTDOwithSDO(targetId, schemaId, auth) {
  var data = await fetchAPI(`
    mutation updateTdoWithSdo {
      updateTDO(
        input: {
          id: "${targetId}"
          contentTemplates: [
            {
              schemaId: "${schemaId}"
              data: {
                userName: "slin"
                email: "slin@veritone.com"
                jobType: "Transcription"
                jobData: "BlahBlahBlah"
              }
            }
          ]
        }
      )
      {
        id
        status
      }
    }
  `, auth)

  return data?.updateTDO
}
