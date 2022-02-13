import fetchAPI from "./fetch_api.js";

export default async function fileTDO(targetId, folderId, auth) {
  var data = await fetchAPI(`
    mutation fileTdo {
      fileTemporalDataObject (input: {
        tdoId: "${targetId}"
        folderId: "${folderId}"
      }) {
        id
      }
    }
  `, auth)

  return data?.jobs
}
