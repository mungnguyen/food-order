import { set } from "@/util/actions"

export const state = () => {
    return {
        api: {
            custom: "/api/user"
        },
        custom: {}
    }
}

export const mutations = {
    SET_CUSTOM: set('custom')
}

export const actions = {
    async customLogin({ state, commit }, customInfo) {
        const res = { isSuccess: false }
        const { custom } = state.api
        try {
            const data = await this.$axios.$post(`${custom}/login`, customInfo)
            if (data.success) {
                localStorage.setItem("token", data.token)
                const user = { ...data.data, role: "custom" }
                const _user = JSON.stringify(user)
                localStorage.setItem("user", _user)
                commit("SET_CUSTOM", user)
                res.isSuccess = true
            }
        } catch (err) {
            console.log("customLogin", err)
        }
        return res
    }

}

