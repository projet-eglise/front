export default ($axios) => ({
  async login(email, password) {
    const data = new FormData()
    data.append('email', email)
    data.append('password', password)

    return await $axios.post('/authentication/login', data)
  },
  async adminLogin(email, password) {
    const data = new FormData()
    data.append('email', email)
    data.append('password', password)

    return await $axios.post('/authentication/admin/login', data)
  },
  async signin(payload) {
    const data = new FormData()
    data.append('firstname', payload.firstname)
    data.append('lastname', payload.lastname)
    data.append('email', payload.email)
    data.append('password', payload.password)
    data.append('birthdate', payload.birthdate)
    data.append('phone_number', payload.phone_number)
    if (payload.profile_image !== null) {
      data.append('profile_image', payload.profile_image)
    }

    return await $axios.post('/signin', data)
  },
  async whoami() {
    return await $axios.get('/whoami')
  },
  async passwordRequest(email) {
    return await $axios.get(`/authentication/reset-password/${email}`)
  },
  async checkToken(token) {
    return await $axios.get(`/authentication/check-password-request/${token}`)
  },
  async changePassword(token, password) {
    const payload = new FormData()
    payload.append('password', password)

    return await $axios.post(`/authentication/change-password/${token}`, payload)
  },
})
