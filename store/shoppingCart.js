export const state = () => {
    return {
        foodList: [],
    }
}
export const mutations = {
    removeDish(state, { id }) {
        return state.foodList = state.foodList.filter(dish => dish.id !== id)

    },
    decrementQuantity(state, { id }) {
        const dish = state.foodList.find(dish => dish.id === id)
        dish.quantity--
    },
    incrementQuantity(state, { id }) {
        const dish = state.foodList.find(dish => dish.id === id)
        dish.quantity++
    },

    setCart(state, { foodList }) {
        state.foodList = foodList
    },

}