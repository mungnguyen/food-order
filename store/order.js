import { set, add, update, remove, removeByIds } from "@/util/actions"

export const state = () => {
    return {
        api: {
            order: "/api/order",
        },
        orderList: [],
        pagination: {
            page: 0,
            pageSize: 0,
            total: 0
        }
    }
}

export const mutations = {
    SET_ORDER_LIST: set("orderList"),
    SET_PAGINATION: set("pagination"),

    ADD_ORDER: add("orderList"),
    UPDATE_ORDER: update("orderList"),
    REMOVE_ORDER: remove("orderList"),
    REMOVE_MULTI_ORDER: removeByIds("orderList")
}

export const actions = {
    async getOrderList({ state, commit }, payload) {
        if (!payload) payload = {}
        const { order } = state.api

        payload.page = payload.page !== undefined ? payload.page : 0
        payload.pageSize = payload.pageSize !== undefined ? payload.pageSize : 20

        const token = this.$auth.$storage.getUniversal('token')
        this.$axios.setHeader('Authorization', "Bearer " + token)

        try {
            const { data } = await this.$axios.$get(order, {
                params: {
                    page: payload.page,
                    pageSize: payload.pageSize
                }
            })

            if (data.rows) {
                commit("SET_ORDER_LIST", data.rows)
                commit("SET_PAGINATION", {
                    page: data.page,
                    pageSize: data.pageSize,
                    total: data.count
                })
            }
        } catch (err) {
            console.log("getOrderList", err)
        }
    },

    async createOrder({ state, commit }, orderInfo) {
        const res = { isSuccess: false }
        const { order } = state.api

        const token = this.$auth.$storage.getUniversal('token')
        this.$axios.setHeader('Authorization', "Bearer " + token)

        const user = this.$auth.$storage.getUniversal('user')

        try {
            const data = await this.$axios.$post(order, orderInfo)

            if (data.success) {
                res.isSuccess = data.success
                commit("ADD_ORDER", { newEl: data.data })
                const pagination = {
                    ...state.pagination,
                    total: state.pagination.total + 1
                }
                commit("SET_PAGINATION", pagination)
            }
        } catch (err) {
            console.log("createOrder", err)
            res.message = data.message
        }
        return res
    },

    async deleteOrder({ state, commit }, orderItem) {
        const res = { isSuccess: false }
        const { order } = state.api

        const token = this.$auth.$storage.getUniversal('token')
        this.$axios.setHeader('Authorization', "Bearer " + token)

        try {
            const data = await this.$axios.$delete(`${order}/${orderItem.id}`)

            if (data.success) {
                res.isSuccess = data.success
                commit("REMOVE_ORDER", orderItem)
                const pagination = {
                    ...state.pagination,
                    total: state.pagination.total - 1
                }
                commit("SET_PAGINATION", pagination)
            }
        } catch (err) {
            console.log("createOrder", err)
            res.message = data.message
        }
        return res

    }


}