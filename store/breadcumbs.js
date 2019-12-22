export const state = () => {
    return {
        breadList: [{
            id: 1,
            name: "Trang chủ",
            url: "/"
        }]
    }
}

export const mutations = {
    ADD_BREADCUMBS(state, breadcumbs) {
        state.breadList.push(breadcumbs)
    },

    GO_BREACUMBS(state, breadId) {
        const index = state.breadList.findIndex(item => item.id === breadId)
        state.breadList = state.breadList.slice(0, index + 1)
    }
}

export const actions = {
    addBreadcumbs({ commit }, breadcumbs) {
        commit("ADD_BREADCUMBS", breadcumbs)
    },

    goBreadcumbs({ commit }, breadId) {
        commit("GO_BREACUMBS", breadId)
    }
}