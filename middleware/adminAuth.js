export default function(ctx) {
    const user = ctx.$auth.$storage.getUniversal("user")
    if (!user) {
        ctx.redirect("/admin/login")
    }

    if (user.role !== 'admin') {
        ctx.redirect("/admin/login")
    }
}