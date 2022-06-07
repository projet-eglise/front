const resource = '/user'

export default ($axios) => {
    return ({
        async getAll() {
            return await $axios.get('/users')
        },
        async addRolesInChurch(uid, payload) {
            return await $axios.post(resource + '/addRolesInChurch/' + uid, {"roles": payload})
        },
    })
}
