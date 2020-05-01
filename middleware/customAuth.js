export default function (ctx) {
    const user = ctx.$auth.$storage.getUniversal("user")
    if (!user) {
        ctx.redirect("/")
    }

    if (user.role !== 'custom') {
        ctx.redirect("/")
    }
}