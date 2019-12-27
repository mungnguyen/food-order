import { set } from "@/util/actions"

export const state = () => {
    return {
        api: {
            custom: "/api/user"
        },
        custom: {},
        customList: [],
        pagination: {
            page: 0,
            pageSize: 0,
            total: 0
        }
    }
}

export const mutations = {
    SET_CUSTOM: set('custom'),
    SET_CUSTOM_LIST: set('customList'),
    SET_PAGINATION: set("pagination")
}

export const actions = {
    setCusstom({ commit }, custom) {
        commit('SET_CUSTOM', custom)
    },

    async customLogin({ state, commit }, customInfo) {
        const res = { isSuccess: false }
        const { custom } = state.api
        try {
            const data = await this.$axios.$post(`${custom}/login`, customInfo)
            if (data.success) {
                this.$auth.$storage.setLocalStorage("token", data.token)
                const user = { ...data.data, role: "custom" }
                this.$auth.$storage.setUniversal("user", user, true)
                commit("SET_CUSTOM", user)
                res.isSuccess = true
            }
        } catch (err) {
            console.log("customLogin", err)
        }
        return res
    },

    async getCustomList({ state, commit }, payload) {
        if (!payload) payload = {}
        const { custom } = state.api

        payload.page = payload.page !== undefined ? payload.page : 0
        payload.pageSize = payload.pageSize !== undefined ? payload.pageSize : 20

        const token = this.$auth.$storage.getUniversal('token')
        this.$axios.setHeader('Authorization', "Bearer " + token)

        try {
            const data = await this.$axios.$get(custom, {
                params: {
                    page: payload.page,
                    pageSize: payload.pageSize
                }
            })

            if (data.rows) {
                commit("SET_CUSTOM_LIST", data.rows)
                commit("SET_PAGINATION", {
                    page: data.page,
                    pageSize: data.pageSize,
                    total: data.count
                })
            }
        } catch (err) {
            console.log("getCustomList", err)
        }
    },

}