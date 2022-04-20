const resource = '/authentication'

export default ($axios) => ({
  async login(email, password) {
    return await $axios.post('/login', {
      email: email,
      password: password,
    })
  },
})
