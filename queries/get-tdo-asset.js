import fetchAPI from "./fetch_api.js";

export default async function getTDOAssets(targetId, auth) {
  var data = await fetchAPI(`
    query getAssets {
      temporalDataObject(id: "${targetId}") {
        primaryAsset(assetType: "media") {
          id
          assetType
          name
          contentType
          signedUri
        }
        assets {
          count
          records {
            sourceData {
              engine {
                id
                name
              }
            }        
            id
            createdDateTime
            assetType
            name
            signedUri
          }
        }
      }
    }
  `, auth)

  return data?.temporalDataObject
}
