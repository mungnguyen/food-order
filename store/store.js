import { set, add, update, remove, removeByIds } from "@/util/actions"

export const state = () => {
    return {
        api: {
            store: "/api/store",
            allStore: "/api/getAllStore"
        },
        storeList: [],
        newStoreList: [],
        pagination: {
            page: 0,
            pageSize: 0,
            total: 0
        }
    }
}

export const mutations = {
    SET_NEW_DISH: set("newStoreList"),
    SET_DISH_LIST: set("storeList"),
    SET_PAGINATION: set("pagination"),

    ADD_DISH: add("storeList"),
    UPDATE_DISH: update("storeList"),
    REMOVE_DISH: remove("storeList"),
    REMOVE_MULTI_DISH: removeByIds("storeList")
}

export const actions = {
    async getStoreList({ state, commit }, payload = { newStore: false }) {
        const { allStore } = state.api

        payload.newStore = payload.newStore ? true : false
        payload.page = payload.page !== undefined ? payload.page : 0
        payload.pageSize = payload.pageSize !== undefined ? payload.pageSize : payload.newStore ? 4 : 20

        try {
            const data = await this.$axios.$get(allStore, {
                params: {
                    page: payload.page,
                    pageSize: payload.pageSize
                }
            })

            if (data.storees) {
                console.log()
                if (payload.newStore) {
                    commit("SET_NEW_DISH", data.storees.rows)
                } else {
                    commit("SET_DISH_LIST", data.storees.rows)
                    commit("SET_PAGINATION", {
                        page: data.storees.page,
                        pageSize: data.storees.pageSize,
                        total: data.storees.count
                    })
                }
            }
        } catch (err) {
            console.log("getNewStoreList", err)
        }
    },



}