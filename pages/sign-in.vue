<template>
  <v-container grid-list-xs>
    <div class="auth-wrapper auth-v1">
      <div class="auth-inner">
        <v-card class="auth-card">
          <!-- logo -->
          <v-card-title class="d-flex align-center justify-center py-7">
            <v-img
              :src="require('@/assets/images/logos/logo.svg')"
              max-height="30px"
              max-width="30px"
              alt="logo"
              contain
              class="me-3"
            ></v-img>
            <h2 class="text-2xl font-weight-semibold">ເຂົ້າສູ່ລະບົບ</h2>
          </v-card-title>

          <!-- login form -->
          <v-card-text>
            <!-- <h1 class="mb-4">{{ $t("login") }}</h1> -->
            <v-text-field
              :label="$t('username')"
              append-icon="mdi-account-circle-outline"
              rounded
              filled
              v-model="frm.username"
            ></v-text-field>
            <v-text-field
              :label="$t('password')"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="!showPass ? 'password' : 'text'"
              @click:append="showPass = !showPass"
              v-model="frm.password"
              rounded
              filled
              @keyup.enter="userLogin()"
            ></v-text-field>

            <div class="d-flex align-center justify-space-between flex-wrap">
              <v-spacer></v-spacer>

              <!-- forgot link -->
              <a href="javascript:void(0)" class="purple--text">
                ລືມລະຫັດຜ່ານ?
              </a>
            </div>

            <v-btn
              @click.prevent="userLogin()"
              :loading="loading"
              :disabled="loading"
              color="#7e57c2"
              height="50"
              rounded
              large
              block
              class="mt-5 white--text"
              >{{ $t("login") }}</v-btn
            >
          </v-card-text>

          <!-- create new account  -->
          <v-card-text
            class="d-flex align-center justify-center flex-wrap mt-2"
          >
            <span class="me-2"> ທ່ານມີບັນຊີ ຫຼື ບໍ່? </span>
            <router-link to="/sign-up" class="purple--text">
              ສ້າງບັນຊີໃໝ່
            </router-link>
          </v-card-text>
        </v-card>
      </div>

      <!-- background triangle shape  -->
      <img
        class="auth-mask-bg"
        height="173"
        :src="
          require(`@/assets/images/misc/mask-${
            $vuetify.theme.dark ? 'dark' : 'light'
          }.png`)
        "
      />

      <!-- tree -->
      <img
        class="auth-tree"
        width="247"
        height="185"
        src="@/assets/images/misc/tree.png"
      />

      <!-- tree  -->
      <img
        class="auth-tree-3"
        width="377"
        height="289"
        src="@/assets/images/misc/tree-3.png"
        alt
      />
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showPass: false,
      loading: false,
      frm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async userLogin() {
      try {
        this.loading = true;
        let response = await this.$auth.loginWith("local", { data: this.frm });
        this.loading = false;
        if (response.data.user.auther != "Customer") {
          this.$router.push("/dashboard");
        }
      } catch (err) {
        this.loading = false;
        this.$toast.error(this.$t("login_fail"));
      }
    },
  },
};
</script>

<style scoped>
.auth-wrapper {
  display: flex;
  min-height: calc(var(--vh, 1vh) * 93);
  width: 100%;
  flex-basis: 100%;
  align-items: center;
}
.auth-wrapper a {
  text-decoration: unset;
}
.auth-wrapper.auth-v1 {
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 1.5rem;
}
.auth-wrapper.auth-v1 .auth-mask-bg {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.auth-wrapper.auth-v1 .auth-tree,
.auth-wrapper.auth-v1 .auth-tree-3 {
  position: absolute;
}
.auth-wrapper.auth-v1 .auth-tree {
  bottom: 0;
  left: 0;
}
.auth-wrapper.auth-v1 .auth-tree-3 {
  bottom: 0;
  right: 0;
}
.auth-wrapper.auth-v1 .auth-inner {
  width: 28rem;
  z-index: 1;
}
.auth-wrapper.auth-v1 .auth-inner .auth-card {
  padding: 0.9375rem 0.875rem;
}
@media (max-width: 600px) {
  .auth-v1 .auth-tree,
  .auth-v1 .auth-tree-3,
  .auth-v1 .auth-mask-bg {
    display: none;
  }
}
</style>
