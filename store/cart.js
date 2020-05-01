import { set } from '@/util/actions'

export const state = () => {
    return {
        cart: {}
    }
}

export const mutations = {
    SET_CART: set('cart')
}

export const actions = {
    setCart({ commit }, cart) {
        commit('SET_CART', cart)
    }
}