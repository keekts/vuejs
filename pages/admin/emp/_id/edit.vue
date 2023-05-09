<template>
  <div>
    <v-container grid-list-xs fluid v-if="frm">
      <h3>{{ $t("edit") }}</h3>
      <v-form ref="form" v-model="valid" lazy-validation>
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
        </v-column>

        <v-column>
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
        </v-column>

        <v-row>
          <v-col md="12" cols="12">
            <v-btn @click="$router.back()" depressed color="error">{{
              $t("cancel")
            }}</v-btn>
            <v-btn @click.prevent="saveAction" depressed color="primary">{{
              $t("ok")
            }}</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      frm: null,
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
          let rs = await this.$axios.put("user", {
            input: this.frm,
            id: this.frm.id,
          });
          this.$toast.success(this.$t("saved"));
          this.$router.back();
        }
      } catch (error) {
        this.$toast.error(this.$t("fail"));
      }
    },
    async getData() {
      try {
        let rs = await this.$axios.get("user", {
          params: {
            id: this.$route.params.id,
          },
        });

        this.frm = rs.data.user;
        this.frm.password = null;
      } catch (error) {}
    },
  },
};
</script>

<style>
</style>
