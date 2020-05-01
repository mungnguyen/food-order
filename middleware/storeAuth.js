export default function (ctx) {
    const user = ctx.$auth.$storage.getUniversal("user")
    if (!user) {
        ctx.redirect("/store/login")
    }

    if (user.role !== 'store') {
        ctx.redirect("/store/login")
    }
}