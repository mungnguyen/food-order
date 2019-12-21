import {
    set
} from '@/utils/action'
export const state = () => {
    return {
        api: {
            login: '/api/login'
        },
        user: {}
    }
}
export const mutations = {
    SET_USER: set('user')
}

export const actions = {
    async login({ state, commit }, user) {
        const res = { isLogin: false, user: null }
        const { login } = state.api

        try {
            const dataUser = await this.$axios.$post(login, user)

            commit('SET_USER', dataUser)
            res.isLogin = true
            res.user = dataUser
        } catch (err) {
            console.log('login', err)
        }
        return res

    },

}