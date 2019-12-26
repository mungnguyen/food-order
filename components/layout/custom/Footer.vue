<template>
  <div class="custom-footer">
    <v-row>
      <v-col cols="4">
        <div class="first-content">
          <div class="first-icon">
            <v-icon size="50" color="#e49f02" dense>mdi-mailbox-open-up-outline</v-icon>
          </div>
          <div class="first-text">
            <h3>Đăng kí để nhận thông tin mới nhất</h3>
            <p>...và nhận 100.000 VND cho lần lượt đăng kí đầu tiên...</p>
          </div>
        </div>
      </v-col>
      <v-col cols="4" class="second-content">
        <v-text-field
          background-color="#fff"
          dark
          solo-inverted
          rounded
          flat
          hide-details
          label="Nhập email của bạn"
          placeholder="Nhập email của bạn"
        >
          <template slot="append">
            <v-btn rounded color="#e49f02">Đăng kí</v-btn>
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="4" class="third-content">
        <div class="button-content">
          <v-btn v-for="(icon, index) in iconList" :key="index" fab dark small>
            <v-icon>{{ icon }}</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row>
      <v-col cols="7" style="display: flex">
        <div>
          <v-icon color="#fff">mdi-headset</v-icon>
        </div>
        <div style="width: 50%; margin: 0 5%">
          <h4>Bạn có thắc mắc?</h4>
          <h4>Hãy gọi cho chúng tôi 24/7</h4>
          <br />
          <h2>(+84) 123 456 789</h2>
          <br />
          <p>
            B-ORDER, luôn
            sẵn sàng lắng nghe bạn
          </p>
        </div>
        <div>
          <v-icon color="#fff">mdi-dolly</v-icon>
        </div>
        <div>
          <h4>Hình thức thanh toán</h4>
          <div>
            <v-icon color="#fff">mdi-credit-card-outline</v-icon>
            <v-icon color="#fff">mdi-cash-multiple</v-icon>
            <v-icon color="#fff">mdi-home-outline</v-icon>
            <v-icon color="#fff">mdi-motobike</v-icon>
          </div>
          <br />
          <v-img width="200px" :src="payments.src"></v-img>
        </div>
      </v-col>
      <v-col cols="1" style="display: flex">
        <v-divider vertical hight="100%"></v-divider>
      </v-col>
      <v-col cols="3" class="text-center">
        <h4>Địa chỉ công ty</h4>
        <v-row class="text-left">
          <v-icon color="#fff">mdi-map-marker</v-icon>&nbsp;
          <span>BORDER- Keangnam Hanoi Landmark Tower</span>
        </v-row>
        <br />
        <v-row class="text-left">
          <v-icon color="#fff">mdi-deskphone</v-icon>&nbsp;
          <span>024356798</span>
        </v-row>
        <br />
        <v-row class="text-left">
          <v-icon color="#fff">mdi-fax</v-icon>&nbsp;
          <span>123456</span>
        </v-row>
        <br />
        <v-row class="text-left">
          <v-icon color="#fff">mdi-email</v-icon>&nbsp;
          <span>sale@border.com</span>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>s

<script>
export default {
  data() {
    return {
      iconList: [
        "mdi-facebook",
        "mdi-twitter",
        "mdi-youtube",
        "mdi-google-plus",
        "mdi-instagram"
      ],
      payments: {
        src: "/images/payment.png"
      }
    };
  }
};
</script>

<style lang="scss">
.custom-footer {
  background: #000;
  color: #fff;
  .first-content {
    .first-icon {
      color: #e49f02;
    }
    display: flex;
    .first-text {
      margin-left: 3%;
      p {
        font-size: small;
      }
    }
  }
  .second-content {
    .v-text-field__slot {
      ::placeholder {
        color: gray;
      }
      input {
        caret-color: #000;
      }
    }
    .v-input__append-inner {
      position: absolute;
      height: 100%;
      right: 0;
      .v-btn {
        height: 100%;
        border-radius: 50px;
        background-color: #e49f02;
        color: #fff;
      }
    }
  }
  .third-content {
    .button-content {
      position: absolute;
      right: 1em;
      .v-btn.v-btn--fab.theme--dark {
        background-color: #fff;
        .v-btn__content {
          color: rgb(185, 174, 174);
        }
      }
      .v-btn.v-btn--fab.theme--dark:hover {
        background-color: #e49f02;
        .v-btn__content {
          color: #fff;
        }
      }
    }
  }
}
</style>