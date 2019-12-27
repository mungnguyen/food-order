<template>
<div>
    <OrderHistory />
</div>
</template>

<script>
import OrderHistory from "@/components/user/OrderHistory"
import { mapState, mapActions } from "vuex"

export default {
    layout: "userInfo",
    middleware: "customAuth",
    components: {
        OrderHistory
    },
computed: {
...mapState("order", ["orderList"])
},
    async asyncData({store}) {
        await store.dispatch("order/getOrderList")
    },
async created() {
 if(!this.orderList.length) {
     await this.getOrderList()
 }
},
    methods: {
        ...mapActions("order", ["getOrderList"])
    }


}
</script>