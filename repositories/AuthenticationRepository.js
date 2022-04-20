
const resource = '/authentication'

export default ($axios) => ({
  login(email, password) {
    return $axios.post(`/login`, {
        email: email,
        password: password,
    })
  },
})