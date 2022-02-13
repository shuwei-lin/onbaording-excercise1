import fetchAPI from "./fetch_api.js";

export default async function createScheduledJob(auth) {
  const clusterId = "rt-9d7a5d1b-ffe0-4d71-a982-190522cdf273"
  var d1 = new Date (),
    d2 = new Date ( d1 );
  d2.setMinutes ( d1.getMinutes() + 30 );

  var data = await fetchAPI(`
    mutation createScheduleJob {
      createScheduledJob(input:
        {
          name: "qv3TestEverye5Minute"
          runMode: Once
          jobTemplates:[
            {
              clusterId:"rt-9d7a5d1b-ffe0-4d71-a982-190522cdf273"
              routes: [
            {
              ## Igniter V3F route
              parentIoFolderReferenceId: "IG_OUTPUT"
              childIoFolderReferenceId: "MY_INPUT"
              options: {}
            }
          ]
              taskTemplates : [
                {
              # Igniter Engine
              engineId: "5305265c-d566-4716-8904-debf7e0ac857"
              ioFolders: [
                {
                  referenceId: "IG_OUTPUT"
                  mode: chunk
                  type: output
                }
              ]
              executionPreferences: { priority: -99 }
              },
              {
                # Flow engine
                engineId: "562f2957-e7c5-490d-95ac-241a18d111bd"
                ioFolders: [
                {
                  referenceId: "MY_INPUT"
                  mode: chunk
                  type: input
                }
              ]
              executionPreferences: { priority: -99 }
              }
              ]
            }
          ]
        }
      ) {
        id
      }
    }
  `, auth)

  return data?.createScheduledJob
}
