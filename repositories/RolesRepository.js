export default ($axios) => {
    return ({
        async getAll() {
            return await $axios.get('/roles')
        },
    })
}
