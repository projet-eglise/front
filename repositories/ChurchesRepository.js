const resource = '/church'

export default ($axios) => {
    return ({
        async add(payload) {
            return await $axios.post(resource + '/add', payload)
        },
    })
}
