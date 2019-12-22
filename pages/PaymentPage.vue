<template>
  <v-container>
    <v-row>
       <v-col cols="7">
        <v-card shaped>
          <v-card-title class="layout justify-center" color="orange darken-2">
            <span class="headline" >Đơn hàng của bạn</span>
          </v-card-title>
            <v-divider vertical light></v-divider>
          <v-simple-table dense>
            <tbody v-for="dish in foodList" :key="dish.id">
              <tr >
                <td class="text-center mx-auto"> 
                  <v-img class="mx-auto" max-width="150px" max-height="150px" :src="dish.src"></v-img>
                </td>
                <td class="text-center">{{ dish.name }} X {{dish.quantity}}</td>
                <td class="text-center">{{ dish.price*dish.quantity}}VNĐ</td>
              </tr>
            </tbody>
            <tfoot>
                  <v-card-text>
                      <label>Tổng tiền: </label>
                  </v-card-text>
                  <v-card-text>
                      <label>Tiền ship: </label>
                  </v-card-text>
                <v-card-text class="mx-auto color:white">
                  <label>
                    <b>Tổng cần thanh toán: </b>
                  </label>
                </v-card-text>
           
              
            </tfoot>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card shaped>
          <v-card-title class="layout justify-center" color="orange darken-2">
            <span class="headline">Thông tin người nhận</span>
          </v-card-title>
        
          <v-row no-gutters justify="center">
            <v-col cols="12" md="10">
                <v-text-field 
                v-model="name"
                label="Tên người nhận" 
                outlined 
                required></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters justify="center">
            <v-col cols="12" md="10">
                <v-text-field label="Địa chỉ" outlined v-model="address" ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters justify="center">
            <v-col cols="12" md="10">
                <v-text-field label="Số điện thoại" outlined v-model="phone"></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters justify="center">
            <v-col cols="12" md="10"> 
                <v-textarea label="Ghi chú" outlined v-model="note" ></v-textarea>
            </v-col>
          </v-row>
        </v-card>
        <br/>
            <v-btn
            rounded
            color="orange darken-2"
            class=" text-center"
          > Thanh toán</v-btn>
      </v-col>
     
    </v-row>
  </v-container>
</template>

<script>
export default {
  data(){
      return{
          foodList: [
        {
          id: 1,
          src: "/images/NewFood/food-4.jpg",
          name: "Whitehaven Beach",
          price: "120000",
          quantity: "1"
        },
        {
          id: 2,
          src: "/images/NewFood/food-1.jpg",
          name: "Whitehaven Beach",
          price: "120000",
          quantity: "1"
        },
        {
          id: 3,
          src: "/images/NewFood/food-2.jpg",
          name: "Whitehaven Beach",
          price: "120000",
          quantity: "1"

        },
        {
          id: 4,
          src: "/images/NewFood/food-3.jpg",
          name: "Whitehaven Beach",
          price: "120000",
          quantity: "1"
        }
      ]
     
      }
  }

}
</script>
<style scoped>

</style>