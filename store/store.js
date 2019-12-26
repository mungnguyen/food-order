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
    async getStoreList({ state, commit }, payload = { newStore: false }) {
        const { store } = state.api

        payload.newStore = payload.newStore ? true : false
        payload.page = payload.page !== undefined ? payload.page : 0
        payload.pageSize = payload.pageSize !== undefined ? payload.pageSize : payload.newStore ? 4 : 20

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
    }

    // async getInforStore({state,commit},id) {
    //     const {inforStore} = state.api

    // }

}