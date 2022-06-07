const resource = '/church'

export default ($axios) => {
    return ({
        async getAll() {
            return await $axios.get('/churches')
        },
        async getjoinable() {
            return await $axios.get('/churches/joinable')
        },
        async add(payload) {
            return await $axios.post(resource + '/add', payload)
        },
        async join(uid) {
            return await $axios.get(resource + '/' + uid + '/join')
        },
    })
}
