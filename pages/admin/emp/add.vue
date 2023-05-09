<template>
  <div class="container">
    <div>
      <h3>{{ $t("add_emp") }}</h3>
      <v-form
        class="multi-col-validation"
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-column>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="frm.first"
              label="ຊື່"
              :rules="nameRules"
              solo
              dense
              placeholder="ຊື່"
              hide-details
              rounded
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="frm.last"
              label="ນາມສະກຸນ"
              :rules="nameRules"
              solo
              dense
              placeholder="ນາມສະກຸນ"
              hide-details
              rounded
            ></v-text-field>
          </v-col>

          <v-col>
            <h4>{{ $t("gender") }}</h4>
            <v-chip-group v-model="frm.gender" active-class="primary" column>
              <v-chip value="F">
                <v-icon>mdi-human-female</v-icon> {{ $t("f") }}
              </v-chip>
              <v-chip value="M">
                <v-icon>mdi-human-male</v-icon> {{ $t("m") }}
              </v-chip>
            </v-chip-group>
          </v-col>

          <v-col cols="12" md="3">
            <v-select
              :items="['User', 'Admin']"
              v-model="frm.auther"
              :label="$t('auther')"
              solo
              dense
              rounded
            ></v-select>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="frm.username"
              label="ຊື່ຜູ້ໃຊ້"
              :rules="nameRules"
              solo
              dense
              placeholder="ຊື່ຜູ້ໃຊ້"
              hide-details
              rounded
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="frm.password"
              :rules="nameRules"
              label="ລະຫັດຜ່ານ"
              solo
              dense
              placeholder="ລະຫັດຜ່ານ"
              hide-details
              rounded
            ></v-text-field>
          </v-col>
          <!-- 
          <v-col cols="12">
            <v-checkbox
              v-model="checkbox"
              label="Remember me"
              class="mt-0"
              hide-details
            ></v-checkbox>
          </v-col> -->

          <v-col cols="12">
            <v-btn @click="$router.back()" depressed color="error">{{
              $t("cancel")
            }}</v-btn>
            <v-btn @click.prevent="saveAction" depressed color="primary">{{
              $t("ok")
            }}</v-btn>
          </v-col>
        </v-column>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      frm: {
        first: null,
        last: null,
        gender: "F",
        username: null,
        password: null,
        auther: "User",
      },
      graduateItems: ["ປະລິນຍາຕີ", "ປະລິນຍາໂທ", "ປະລິນຍາເອກ"],
      valid: true,
      nameRules: [(v) => !!v || this.$t("plase_val")],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async saveAction() {
      try {
        if (this.$refs.form.validate()) {
          let rs = await this.$axios.post("user", this.frm);
          this.$toast.success(this.$t("saved"));
          this.$router.push(`/admin/emp/${rs.data.user.id}`);
        }
      } catch (error) {
        this.$toast.error(this.$t("fail"));
      }
    },
    async getData() {
      try {
        let rs = await this.$axios.get("user");
        this.users = rs.data.users;
      } catch (error) {}
    },
  },
};
</script>

<style scoped>
.container {
  margin: auto;
}
</style>
