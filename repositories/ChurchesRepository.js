const resource = '/church'

export default ($axios) => {
    return ({
        async getjoinable() {
            return await $axios.get('/churches/joinable')
        },
        async add(payload) {
            return await $axios.post(resource + '/add', payload)
        },
    })
}
