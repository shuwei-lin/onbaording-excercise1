import fetch from "node-fetch";

export default async function fetchAPI(query, auth, { variables } = {}) {
  const API_URL = "https://api.dev.us-1.veritone.com/v3/graphql";

  const res = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}