export const actions = {
    addToCart(dish) {
        const _cart = localStorage.getItem("cart")
        const cart = JSON.parse(_cart)
        if (!cart[dish.store_id]) {
            cart[dish.store_id] = {
                dishList: []
            }
        }
        cart[dish.store_id].dishList.push(dish)
    }
}