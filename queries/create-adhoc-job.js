import fetchAPI from "./fetch_api.js";

export default async function createAdhocJob(auth) {
  const clusterId = "rt-9d7a5d1b-ffe0-4d71-a982-190522cdf273"
  var d1 = new Date (),
    d2 = new Date ( d1 );
  d2.setMinutes ( d1.getMinutes() + 30 );

  var data = await fetchAPI(`
    mutation createWSAJobV3JobDAGForNewTDO {
      createJob(
        input: {
          clusterId: "${clusterId}"
          target: { startDateTime: "${d1}", stopDateTime: "${d2}" }
          tasks: [
            {
              engineId: "9e611ad7-2d3b-48f6-a51b-0a1ba40fe255"
              payload: {
                url: "https://s3.amazonaws.com/src-veritone-tests/stage/20190505/0_40_Eric%20Knox%20BWC%20Video_40secs.mp4"
              }
              ioFolders: [
                { referenceId: "wsaOutputFolder", mode: stream, type: output }
              ]
              executionPreferences: { priority: -150 }
            }
            {
              engineId: "352556c7-de07-4d55-b33f-74b1cf237f25"
              ioFolders: [
                { referenceId: "playbackInputFolder", mode: stream, type: input }
              ]
              executionPreferences: {
                parentCompleteBeforeStarting: true
                priority: -150
              }
            }
            {
              engineId: "8bdb0e3b-ff28-4f6e-a3ba-887bd06e6440"
              payload: {
                ffmpegTemplate: "audio"
                customFFMPEGProperties: { chunkSizeInSeconds: "20" }
              }
              ioFolders: [
                { referenceId: "chunkAudioInputFolder", mode: stream, type: input }
                { referenceId: "chunkAudioOutputFolder", mode: chunk, type: output }
              ]
              executionPreferences: {
                parentCompleteBeforeStarting: true
                priority: -150
              }
            }
            {
              engineId: "c0e55cde-340b-44d7-bb42-2e0d65e98255"
              ioFolders: [
                {
                  referenceId: "transcriptionInputFolder"
                  mode: chunk
                  type: input
                }
                {
                  referenceId: "transcriptionOutputFolder"
                  mode: chunk
                  type: output
                }
              ]
              executionPreferences: { priority: -150 }
            }
            {
              engineId: "8eccf9cc-6b6d-4d7d-8cb3-7ebf4950c5f3"
              ioFolders: [
                {
                  referenceId: "owInputFolderFromTranscription"
                  mode: chunk
                  type: input
                }
              ]
              executionPreferences: {
                parentCompleteBeforeStarting: true
                priority: -150
              }
            }
          ]
          routes: [
            {
              parentIoFolderReferenceId: "wsaOutputFolder"
              childIoFolderReferenceId: "playbackInputFolder"
              options: {}
            }
            {
              parentIoFolderReferenceId: "wsaOutputFolder"
              childIoFolderReferenceId: "chunkAudioInputFolder"
              options: {}
            }
            {
              parentIoFolderReferenceId: "chunkAudioOutputFolder"
              childIoFolderReferenceId: "transcriptionInputFolder"
              options: {}
            }
            {
              parentIoFolderReferenceId: "transcriptionOutputFolder"
              childIoFolderReferenceId: "owInputFolderFromTranscription"
              options: {}
            }
          ]
        }
      ) {
        id
        targetId
      }
    }
  `, auth)

  return data?.createJob
}
