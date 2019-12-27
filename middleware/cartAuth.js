export default function (ctx) {
    const cart = ctx.$auth.$storage.getUniversal("cart")
    if (!cart || !Object.keys(cart).length) {
        ctx.redirect('/')
    }
}