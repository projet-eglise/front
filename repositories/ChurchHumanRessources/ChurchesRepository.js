const resource = '/church-human-ressources'

export default ($axios) => {
    return ({
        async all() {
            return await $axios.get(resource + '/churches/all')
        },
        async joinable() {
            return await $axios.get(resource + '/churches/joinable')
        },
    })
}
