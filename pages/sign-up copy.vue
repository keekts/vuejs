<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col md="6" cols="12">
        <v-form ref="form" v-model="valid" lazy-validation>
          <h1 class="mb-4">ລົງທະບຽນ</h1>
          <v-row>
            <v-col>
              <v-text-field
                :label="$t('name')"
                append-icon="mdi-account-circle-outline"
                rounded
                filled
                v-model="frm.first"
                :rules="nameRules"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                :label="$t('last')"
                append-icon="mdi-account-circle-outline"
                rounded
                filled
                v-model="frm.last"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-text-field
            :label="$t('phone')"
            append-icon="mdi-card-account-phone-outline"
            rounded
            filled
            v-model="frm.phone"
          ></v-text-field>
          <v-text-field
            :label="$t('email')"
            append-icon="mdi-email-outline"
            rounded
            filled
            v-model="frm.email"
            :rules="nameRules"
            type="email"
          ></v-text-field>
          <v-text-field
            :label="$t('password')"
            :rules="nameRules"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="!showPass ? 'password' : 'text'"
            @click:append="showPass = !showPass"
            rounded
            filled
            v-model="frm.password"
          ></v-text-field>
          <v-text-field
            :label="$t('confirm_password')"
            :rules="nameRules"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="!showPass ? 'password' : 'text'"
            @click:append="showPass = !showPass"
            rounded
            filled
            v-model="pass2"
          ></v-text-field>

          <v-btn
            @click.prevent="resgiterAction()"
            color="primary"
            height="60"
            rounded
            large
            block
            :loading="loading"
            :disabled="pass2 !== frm.password || pass2.length < 5"
          >
            {{ $t("register") }}
          </v-btn>
        </v-form>
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
      pass2: "",
      frm: {
        email: "",
        password: "",
        phone: "",
        email: "",
        first: "",
        last: "",
      },
      valid: true,
      nameRules: [(v) => !!v || this.$t("plase_val")],
    };
  },
  methods: {
    async resgiterAction() {
      try {
        this.loading = true;
        this.$toast.warning(this.$t("please"));
        if (this.$refs.form.validate()) {
          let rs = await this.$axios.post("welcome/register", {
            input: this.frm,
          });
          if (rs.data.status) {
            this.$toast.success(this.$t("success"));
            this.$router.push(`/sign-in`);
          } else {
            this.$toast.error(this.$t(rs.data.label));
          }
          this.loading = false;
        }
      } catch (error) {
        this.loading = false;
        this.$toast.error(this.$t("fail"));
      }
    },
  },
};
</script>

<style></style>
