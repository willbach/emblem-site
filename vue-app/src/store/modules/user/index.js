import userRepository from '../../../repositories/user.repository'

const userRepo = new userRepository

const state = {
  userData: {},
  profilePic: '',
  transcript: '',
  transcriptHash: ''
}

// getters
const getters = {
  // the underscore means that the parameter is not used by the function
  userInfo: (state, _getters, _rootState) => {
    return state.userData
  },

  email: (state, _getters, _rootState) => {
    return state.userData.username
  },

  username: (state, _getters, _rootState) => {
    return state.userData.username
  },

  firstName: (state, _getters, _rootState) => {
    return state.userData.firstName
  },

  lastName: (state, _getters, _rootState) => {
    return state.userData.lastName
  },
  
  dateOfBirth: (state, _getters, _rootState) => {
    return state.userData.dateOfBirth
  },

  schoolID: (state, _getters, _rootState) => {
    return state.userData.schoolID
  },

  transcript: (state, _getters, _rootState) => {
    return state.transcript
  },

  transcriptHash: (state, _getters, _rootState) => {
    return state.transcript
  },

  profilePic: (state, _getters, _rootState) => {
    return state.profilePic
  }
}

// actions
const actions = {
  createUser ({ commit, state }, userData) {
    return userRepo.createUser(userData)
    .then(token => userRepo.setToken(token))
    .then(() => userRepo.getUser())
    .then(userData => commit('setUser', userData))
  }
}

// mutations
const mutations = {
  setUser (state, userData) {
    state.userData = userData
  },

  removeUser (state) {
    delete state.userData
  },

  setTranscriptHash (state, hash) {
    state.transcriptHash = hash
  },

  removeTranscriptHash (state) {
    delete state.transcriptHash
  },
  
  setTranscript (state, transcript) {
    state.transcript = transcript
  },

  removeTranscript (state) {
    delete state.transcript
  },

  setProfilePic (state, pic) {
    state.profilePic = pic
  },

  removeProfilePic (state) {
    delete state.profilePic
  }

  // EXAMPLE
  // setProducts (state, products) {
  //   state.all = products
  // },

  // decrementProductInventory (state, { id }) {
  //   const product = state.all.find(product => product.id === id)
  //   product.inventory--
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
