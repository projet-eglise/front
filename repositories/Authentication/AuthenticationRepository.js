const resource = '/authentication'

export default ($axios) => ({
  async login(email, password) {
    const data = new FormData()
    data.append('email', email)
    data.append('password', password)

    return await $axios.post(resource + '/login', data)
  },
  async adminLogin(email, password) {
    const data = new FormData()
    data.append('email', email)
    data.append('password', password)

    return await $axios.post(resource + '/admin/login', data)
  },
  async signin(firstname, lastname, email, password, phone, birthdate, profilePicture) {
    const data = new FormData()
    data.append('firstname', firstname)
    data.append('lastname', lastname)
    data.append('email', email)
    data.append('password', password)
    data.append('birthdate', birthdate)
    data.append('phone', phone)
    if (profilePicture !== null) {
      data.append('profile_image', profilePicture)
    }

    return await $axios.post(resource + '/signin', data)
  },
  async passwordRequest(email) {
    return await $axios.get(resource + `/reset-password/${email}`)
  },
  async checkToken(token) {
    return await $axios.get(resource + `/check-password-request/${token}`)
  },
  async changePassword(token, password) {
    const payload = new FormData()
    payload.append('password', password)

    return await $axios.post(resource + `/change-password/${token}`, payload)
  },
})
