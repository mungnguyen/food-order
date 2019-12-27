import {set, add, update, remove, removeByIds } from "@/util/actions"

export const state = () => {
    return {
        api: {
            shipper: "/api/shipper",
        },
        shipperList: [],
        pagination: {
            page: 0,
            pageSize: 0,
            total: 0
        }
    }
}

export const mutations = {
    SET_CATEGORY_LIST: set("shipperList"),
    SET_PAGINATION: set("pagination"),

    ADD_CATEGORY: add("shipperList"),
    UPDATE_CATEGORY: update("shipperList"),
    REMOVE_CATEGORY: remove("shipperList"),
    REMOVE_MULTI_CATEGORY: removeByIds("shipperList")
}

export const actions = {
    async getShipperList({ state, commit }, payload) {
        if (!payload) payload = {}
        const { shipper } = state.api

        payload.page = payload.page !== undefined ? payload.page : 0
        payload.pageSize = payload.pageSize !== undefined ? payload.pageSize : 20

        const token = this.$auth.$storage.getUniversal('token')
        this.$axios.setHeader('Authorization', "Bearer " + token)

        try {
            const data = await this.$axios.$get(shipper, {
                params: {
                    page: payload.page,
                    pageSize: payload.pageSize
                }
            })

            if (data.rows) {
                commit("SET_CATEGORY_LIST", data.rows)
                commit("SET_PAGINATION", {
                    page: data.page,
                    pageSize: data.pageSize,
                    total: data.count
                })
            }
        } catch (err) {
            console.log("getShipperList", err)
        }
    },

    async createShipper({ state, commit }, shipperInfo) {
        const res = { isSuccess: false }
        const { shipper } = state.api

        const token = this.$auth.$storage.getUniversal('token')
        this.$axios.setHeader('Authorization', "Bearer " + token)

        const user = this.$auth.$storage.getUniversal('user')

        try {
            const data = await this.$axios.$post(shipper, shipperInfo)

            if (data.success) {
                res.isSuccess = data.success
                commit("ADD_CATEGORY", { newEl: data.data })
                const pagination = {
                    ...state.pagination,
                    total: state.pagination.total + 1
                }
                commit("SET_PAGINATION", pagination)
            }
        } catch (err) {
            console.log("createShipper", err)
            res.message = data.message
        }
        return res
    },

    async deleteShipper({ state, commit }, shipperItem) {
        const res = { isSuccess: false }
        const { shipper } = state.api

        const token = this.$auth.$storage.getUniversal('token')
        this.$axios.setHeader('Authorization', "Bearer " + token)

        try {
            const data = await this.$axios.$delete(`${shipper}/${shipperItem.id}`)

            if (data.success) {
                res.isSuccess = data.success
                commit("REMOVE_CATEGORY", shipperItem)
                const pagination = {
                    ...state.pagination,
                    total: state.pagination.total - 1
                }
                commit("SET_PAGINATION", pagination)
            }
        } catch (err) {
            console.log("createShipper", err)
            res.message = data.message
        }
        return res

    }


}