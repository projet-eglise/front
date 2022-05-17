const resource = '/user'

export default ($axios) => {
    return ({
        async addRolesInChurch(uid, payload) {
            return await $axios.post(resource + '/addRolesInChurch/' + uid, {"roles": payload})
        },
    })
}
