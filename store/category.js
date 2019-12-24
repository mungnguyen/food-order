import { set, add, update, remove, removeByIds } from "@/util/actions"

export const state = () => {
    return {
        api: {
            category: "/api/category",
        },
        categoryList: [],
        pagination: {
            page: 0,
            pageSize: 0,
            total: 0
        }
    }
}

export const mutations = {
    SET_NEW_CATEGORY: set("newCategoryList"),
    SET_CATEGORY_LIST: set("categoryList"),
    SET_PAGINATION: set("pagination"),

    ADD_CATEGORY: add("categoryList"),
    UPDATE_CATEGORY: update("categoryList"),
    REMOVE_CATEGORY: remove("categoryList"),
    REMOVE_MULTI_CATEGORY: removeByIds("categoryList")
}

export const actions = {
    async getCategoryList({ state, commit }, payload) {
        const { category } = state.api

        payload.page = payload.page !== undefined ? payload.page : 0
        payload.pageSize = payload.pageSize !== undefined ? payload.pageSize : 20

        try {
            const data = await this.$axios.$get(category, {
                params: {
                    page: payload.page,
                    pageSize: payload.pageSize
                }
            })

            if (data.category.rows) {
                commit("SET_CATEGORY_LIST", data.category.rows)
                commit("SET_PAGINATION", {
                    page: data.category.page,
                    pageSize: data.category.pageSize,
                    total: data.category.count
                })
            }
        } catch (err) {
            console.log("getCategoryList", err)
        }
    },



}