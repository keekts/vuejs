<template>
  <div>
    <v-container grid-list-xs fluid>
      <h3>{{ $t("add_emp") }}</h3>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-column>
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
          <v-col>
            <v-text-field
              :label="$t('name') + '*'"
              :rules="nameRules"
              v-model="frm.first"
              rounded
              solo
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field :label="$t('last')" v-model="frm.last"></v-text-field>
          </v-col>
        </v-column>
        <v-column>
          <v-col>
            <v-text-field
              :label="$t('phone')"
              v-model="frm.phone"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              :label="$t('email') + '*'"
              :rules="nameRules"
              v-model="frm.email"
            ></v-text-field>
          </v-col>
        </v-column>
        <v-row>
          <v-col>
            <v-text-field
              :label="$t('username') + '*'"
              :rules="nameRules"
              v-model="frm.username"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              :label="$t('password') + '*'"
              :rules="nameRules"
              v-model="frm.password"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-select
              :items="['User', 'Admin']"
              v-model="frm.auther"
              :label="$t('auther')"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field :label="$t('age')" v-model="frm.age"></v-text-field>
          </v-col>
          <v-col>
            <v-textarea
              rows="1"
              v-model="frm.address"
              :label="$t('address')"
            ></v-textarea>
          </v-col>
        </v-row>

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
      frm: {
        first: null,
        last: null,
        gender: "F",
        age: null,
        address: null,
        email: null,
        username: null,
        password: null,
        phone: null,
        auther: "User",
      },
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

<style>
</style>
