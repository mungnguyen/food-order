
<template>
  <v-container v-if="foodList.length > 0">
    <v-row justify="center">
      <v-col cols="10">
        <v-card color="white">
          <v-simple-table dense v-for="item in foodList" :key="item.id">
            <thead>
                 <th>
                   <v-row>
                   <v-col cols="2">
                     <v-checkbox v-model="storeName" class="mx-2"  ></v-checkbox>
                  </v-col> 
                  <v-col cols="6" class="text-left">
                    {{ item.store_name}}
                  </v-col>
                  </v-row>
                 </th>
            </thead>
            <tbody>
              <tr >
                <td class="text-center mx-auto">
                  <v-img class="mx-auto" max-width="150px" max-height="150px" :src="item.src"></v-img>
                </td>
                <td class="text-center">{{ item.name }}</td>

                <td class="text-center">{{ item.price}}VNĐ</td>
                <td class="text-center">
                  <v-card flat class="py-12">
                    <v-card-text style="padding-top: 0px">
                      <v-row align="center" justify="center">
                        <v-col cols="10"></v-col>
                        <v-btn-toggle dense>
                          <v-btn
                            :disabled="item.quantity > 1 ? false : true"
                            min-width="2rem"
                          >
                            <span>-</span>
                          </v-btn>
                          <v-btn disabled min-width="2rem">
                            <span> {{ item.quantity }} </span>
                          </v-btn>
                          <v-btn
                            min-width="2rem"
                          > 
                            <span>+</span>
                          </v-btn>
                        </v-btn-toggle>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </td>
                <td class="text-center">
                  <v-btn text color="red" >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <td class="text-center">
                <v-card-text >
                  <b>Tổng tiền:</b>
                </v-card-text>
              </td>
            </tfoot>
          </v-simple-table>
          <v-col class="mx-auto pt-0 px-0 mx-auto pt-0">
            <v-card-actions>
              <v-btn exact
                color="orange darken-2"
                dark
                class="mx-auto"
                :disabled="!foodList.length"
              >Thanh toán</v-btn>
            </v-card-actions>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-card v-else flat height="100%" class="pt-10">
    <v-img
      class="white--text mx-auto"
      max-width="300"
      max-height="300"
      src="https://www.tangerineworld.com/web_theme/images/empty-cart.png"
    ></v-img>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      storeName: false,
      foodList: [
        {
          id: 1,
          src: "/images/NewFood/food-4.jpg",
          name: "Whitehaven Beach",
          price: "120000",
          quantity: "1",
          store_name: "Quán ăn ngon"
        },
        {
          id: 2,
          src: "/images/NewFood/food-1.jpg",
          name: "Whitehaven Beach",
          price: "120000",
          quantity: "1",
          store_name: "Món ăn Việt"
        },
        
      ],

    };
  },
 
};
</script>

