import { makeRequest, auth } from './lib/helpers'

export default class TranscriptRepository {
  uploadTranscripts (transcriptData) {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': auth.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transcriptData)
    }
    return makeRequest('/transcript', options)
  }
}
