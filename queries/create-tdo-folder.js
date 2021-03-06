import fetchAPI from "./fetch_api.js";

export default async function createTDOFolder(parentId, auth) {
  var data = await fetchAPI(`
    mutation createFolder {
      createFolder(input: {
        name: "Onboarding2-shuwei"
        description: ""
        parentId: "${parentId}"
        rootFolderType: collection
      }) {
        id
        name
      }
    }
  `, auth)

  return data?.createFolder
}
