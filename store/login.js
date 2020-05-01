import { set } from '@/util/actions'
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
        const { login } = state.api

        try {
            const data = await this.$axios.$post(login, user)
            if (data) {
                commit('SET_USER', data)
            }
        } catch (err) {
            console.log('login', err)
        }


    },

}