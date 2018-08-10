export default class UserRepository {
  constructor () {
    this.token = ''
    this.auth = false
  }

  setToken (token) {
    this.token = token
  }

  getUser () {
    const options = {
      headers: {
        'x-access-token': this.token,
        'Content-Type': 'application/json'
      }
    }
    return fetch('/user', options)
  }

  createUser (userData) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }
    return fetch('/user', options)
  }

  updateUser () {
    const options = {
      method: 'PUT',
      headers: {
        'x-access-token': this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }
    return fetch('/user', options)
  }

  deleteUser () {
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': this.token,
        'Content-Type': 'application/json'
      }
    }
    return fetch('/user', options)
  }
}
