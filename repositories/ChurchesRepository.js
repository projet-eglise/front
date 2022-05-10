const resource = '/church'

export default ($axios) => {
    return ({
        async getAllForJoin() {
            return await $axios.get(resource + 'es/forJoin')
        },
        async add(payload) {
            return await $axios.post(resource + '/add', payload)
        },
    })
}
