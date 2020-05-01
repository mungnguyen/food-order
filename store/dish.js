import { set, add, update, remove, removeByIds } from "@/util/actions"

export const state = () => {
    return {
        api: {
            dish: "/api/dish",
            allDish: "/api/getAllDish"
        },
        dishList: [],
        newDishList: [],
        pagination: {
            page: 0,
            pageSize: 0,
            total: 0
        }
    }
}

export const mutations = {
    SET_NEW_DISH: set("newDishList"),
    SET_DISH_LIST: set("dishList"),
    SET_PAGINATION: set("pagination"),

    ADD_DISH: add("dishList"),
    UPDATE_DISH: update("dishList"),
    REMOVE_DISH: remove("dishList"),
    REMOVE_MULTI_DISH: removeByIds("dishList")
}

export const actions = {
    async getDishList({ state, commit }, payload = { newDish: false }) {
        const { allDish } = state.api

        payload.newDish = payload.newDish ? true : false
        payload.page = payload.page !== undefined ? payload.page : 0
        payload.pageSize = payload.pageSize !== undefined ? payload.pageSize : payload.newDish ? 4 : 20

        try {
            const data = await this.$axios.$get(allDish, {
                params: {
                    page: payload.page,
                    pageSize: payload.pageSize
                }
            })

            if (data.dishes) {
                console.log()
                if (payload.newDish) {
                    commit("SET_NEW_DISH", data.dishes.rows)
                } else {
                    commit("SET_DISH_LIST", data.dishes.rows)
                    commit("SET_PAGINATION", {
                        page: data.dishes.page,
                        pageSize: data.dishes.pageSize,
                        total: data.dishes.count
                    })
                }
            }
        } catch (err) {
            console.log("getNewDishList", err)
        }
    },



}