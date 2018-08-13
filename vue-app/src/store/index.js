import Vue from 'vue'
import Vuex from 'vuex'

import loader from './modules/loader'
import user from './modules/user'

import TranscriptRepository from '../repositories/transcript.repository'

const transcriptRepo = new TranscriptRepository()

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    loader,
    user
  },
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {
    uploadTranscripts: ({ commit, state }, transcriptData) => {
      commit('loader/setLoading', true)
      transcriptRepo.uploadTranscripts(transcriptData)
        .then(data => 'UPLOAD SUCCESS')
        .catch(err => console.log('ERROR UPLOADING TRANSCRIPTS: ', err))
        .finally(() => commit('loader/setLoading', true))
    }
  }
})
export default store
