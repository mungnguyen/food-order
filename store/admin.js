import { set } from "@/util/actions"

export const state = () => {
    return {
        api: {
            admin: "/api/admin"
        }
    }
}

export const actions = {
    async adminLogin({ state, commit }, adminInfo) {
        const res = { isSuccess: false }
        const { admin } = state.api
        try {
            const data = await this.$axios.$post(`${admin}/login`, adminInfo)
            if (data.success) {
                this.$auth.$storage.setLocalStorage("token", data.token)
                const user = { ...data.data, role: "admin" }
                this.$auth.$storage.setUniversal("user", user, true)
                res.isSuccess = true
            }
        } catch (err) {
            console.log("adminLogin", err)
        }
        return res
    }

}