import fetchAPI from "./fetch_api.js";

export default async function login() {
  var data = await fetchAPI(`
  mutation {
		userLogin(
		  input: { userName: "aaudi@veritone.com", password: "GoHzksoaNW^CvPnV2Au2" }
		) {
		  token
		  organization {
        id
        name
		  }
		}
  }
  `)

  return data?.userLogin
}
