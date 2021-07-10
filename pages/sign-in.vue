<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col md="3" cols="12" sm="4" xl="4">
        <h1 class="mb-4">{{ $t("login") }}</h1>
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
        <v-btn
          @click.prevent="userLogin()"
          :loading="loading"
          :disabled="loading"
          color="primary"
          height="60"
          rounded
          large
          block
          >{{ $t("login") }}</v-btn
        >
      </v-col>
      <v-col md="6" cols="12" s>
        <v-layout justify-center fill-height wrap>
          <div style="width:100%" class="text-center">
            <h1 class="my-6">{{ $t("register") }}</h1>
            <div style="max-width:300px;margin:0 auto">
              <v-btn
                color="primary"
                rounded
                large
                elevation="0"
                block
                to="/sign-up"
                height="60"
              >
                {{ $t("register") }}
              </v-btn>
            </div>
          </div>
        </v-layout>
      </v-col>
    </v-row>
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
        if (response.data.user.auther == "Admin") {
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

<style></style>
