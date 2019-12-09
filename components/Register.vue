<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn small color="#fff" text v-on="on">Đăng ký</v-btn>
      </template>
     <v-card flat>
      <v-toolbar color="#e49f02" >
        <v-card-title class="layout justify-center">
          <span class="headline">Đăng ký</span>
        </v-card-title>
      </v-toolbar>
      <v-card-text>
          <v-container>
            
            <v-row>
              
              <v-col cols="12" >
                <v-text-field 
                v-model="email"
                :rules="emailRules"
                prepend-icon="mdi-email" 
                label="Email*" 
                required></v-text-field>
              </v-col>

              <v-col cols="12" >
                <v-text-field 
                v-model="name"
                :counter="10"
                :rules="nameRules"
                prepend-icon="mdi-rename-box" 
                label="Tên đăng nhập" 
                required>
                </v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field 
                :type=" displayPassword ? 'text' : 'password' " 
                v-model="password"
                :rules="passWordRules"
                prepend-icon="mdi-lock" 
                :append-icon="displayPassword ? 'mdi-eye' : 'mdi-eye-off'"
                label="Mật khẩu" 
                @click:append="displayPassword = !displayPassword"
                required
                ></v-text-field>
              </v-col>

            </v-row>
           
          </v-container>
          
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange darken-2" dark  text @click="dialog = false"><v-icon dark left>mdi-arrow-left</v-icon>Trở lại</v-btn>
          <v-btn  
            @click="dialog = false"
            :disabled="(email.length == 0)||(password.length == 0)||(name.length == 0)"
            color="success" 
            class="mr-4"
          >Đăng ký</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>

  export default {
    data() {
      return {
      dialog: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
        password: '',
        passWordRules: [
        v => !!v || 'Password is required',
        v =>  v.length >= 8 || 'Min 8 characters',
        v => /[A-Z]+/.test(v) || 'One uppercase letter required'
     

        ],
        name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],

    }
   
  }
  }
</script>
