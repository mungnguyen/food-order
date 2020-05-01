import { set, add, update, remove, removeByIds } from "@/util/actions"

export const state = () => {
    return {
        api: {
            store: "/api/store",
            allStore: "/api/getAllStore",
            inforStore: "/api/store/id"

        },
        storeList: [],
        newStoreList: [],
        inforStore: [],
        viewStore: {},

        pagination: {
            page: 0,
            pageSize: 0,
            total: 0
        }
    }
}

export const mutations = {
    SET_NEW_STORE: set("newStoreList"),
    SET_STORE_LIST: set("storeList"),
    SET_VIEW_STORE: set("viewStore"),
    SET_PAGINATION: set("pagination"),
    SET_INFOR_STORE: set("inforStore"),

    ADD_STORE: add("storeList"),
    UPDATE_STORE: update("storeList"),
    REMOVE_STORE: remove("storeList"),
    REMOVE_MULTI_STORE: removeByIds("storeList")
}

export const actions = {
    async storeLogin({ state }, storeInfo) {
        const res = { isSuccess: false }
        const { store } = state.api
        try {
            const data = await this.$axios.$post(`${store}/login`, storeInfo)
            if (data.success) {
                this.$auth.$storage.setLocalStorage("token", data.token)
                const user = { ...data.data, role: "store" }
                this.$auth.$storage.setUniversal("user", user, true)
                res.isSuccess = true
            }
        } catch (err) {
            console.log("storeLogin", err)
        }
        return res
    },

    async getStoreList({ state, commit }, payload = { newStore: false }) {
        const { store } = state.api

        payload.newStore = payload.newStore ? true : false
        payload.page = payload.page !== undefined ? payload.page : 0
        payload.pageSize = payload.pageSize !== undefined ? payload.pageSize : payload.newStore ? 4 : 20

        // const token = this.$auth.$storage.getUniversal('token')
        // this.$axios.setHeader('Authorization', "Bearer " + token)

        try {
            const data = await this.$axios.$get(store, {
                params: {
                    page: payload.page,
                    pageSize: payload.pageSize
                }
            })

            if (data.rows) {
                console.log()
                if (payload.newStore) {
                    commit("SET_NEW_STORE", data.rows)
                } else {
                    commit("SET_STORE_LIST", data.rows)
                    commit("SET_PAGINATION", {
                        page: data.page,
                        pageSize: data.pageSize,
                        total: data.count
                    })
                }
            }
        } catch (err) {
            console.log("getNewStoreList", err)
        }
    },

    async getViewStore({ state, commit }, storeId) {
        const { store } = state.api

        try {
            const { data } = await this.$axios.$get(`${store}/${storeId}`)
            if (data) {
                commit("SET_VIEW_STORE", data)
            }
        } catch (err) {
            console.log("viewStore-store", err)
        }
    },

    // async getInforStore({state,commit},id) {
    //     const {inforStore} = state.api

    // }

    async createStore({ state, commit }, storeInfo) {
        const res = { isSuccess: false }
        const { store } = state.api

        const token = this.$auth.$storage.getUniversal('token')
        this.$axios.setHeader('Authorization', "Bearer " + token)

        const user = this.$auth.$storage.getUniversal('user')

        try {
            const data = await this.$axios.$post(store, storeInfo)

            if (data.success) {
                res.isSuccess = data.success
                commit("ADD_STORE", { newEl: data.data })
                const pagination = {
                    ...state.pagination,
                    total: state.pagination.total + 1
                }
                commit("SET_PAGINATION", pagination)
            }
        } catch (err) {
            console.log("createStore", err)
            res.message = data.message
        }
        return res
    },

    async deleteStore({ state, commit }, storeItem) {
        const res = { isSuccess: false }
        const { store } = state.api

        const token = this.$auth.$storage.getUniversal('token')
        this.$axios.setHeader('Authorization', "Bearer " + token)

        try {
            const data = await this.$axios.$delete(`${store}/${storeItem.id}`)

            if (data.success) {
                res.isSuccess = data.success
                commit("REMOVE_STORE", storeItem)
                const pagination = {
                    ...state.pagination,
                    total: state.pagination.total - 1
                }
                commit("SET_PAGINATION", pagination)
            }
        } catch (err) {
            console.log("createStore", err)
            res.message = data.message
        }
        return res

    }


}