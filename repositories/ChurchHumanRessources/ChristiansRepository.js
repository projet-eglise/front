const resource = '/church-human-ressources'

export default ($axios) => {
    return ({
        async all() {
            return await $axios.get(resource + '/christians/all')
        },
        async get(uuid) {
            return await $axios.get(`${resource}/christian/${uuid}`)
        },
    })
}
