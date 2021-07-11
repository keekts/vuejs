<template>
  <div>
    <v-container grid-list-xs fluid>
      <h3>{{ $t("emp") }}</h3>
      <v-data-table :headers="headers" :items="users" :loading="loading">
        <template v-slot:item.photo="{ item }">
          <div>
            <v-avatar size="36" color="grey lighten-1">
              <img :src="path + item.photo" alt="alt" v-if="item.photo" />
              <v-icon class="mdi-24px" v-else>mdi-account</v-icon>
            </v-avatar>
          </div>
        </template>
        <template v-slot:item.first="{ item }">
          <div>
            <nuxt-link :to="`/admin/emp/${item.id}`">
              {{ item.first }} {{ item.last }}
            </nuxt-link>
          </div>
        </template>

        <template v-slot:item.auther="{ item }">
          <div>
            <v-chip small v-if="item.auther == 'Admin'" color="primary">{{
              item.auther
            }}</v-chip>
            <v-chip small v-else color="grey" dark>{{ item.auther }}</v-chip>
          </div>
        </template>

        <template v-slot:item.option="{ item }">
          <div>
            <v-btn link nuxt :to="`/admin/emp/${item.id}/edit`" icon>
              <v-icon>mdi-pen</v-icon>
            </v-btn>
            <v-btn @click="openDel(item)" icon color="error">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-container>
    <v-btn color="primary" fab fixed bottom right to="/admin/emp/add">
      <v-icon>mdi-account-plus-outline</v-icon>
    </v-btn>

    <ConfirmBox v-model="del" @ok="deleteAction" okText="delete">
      <v-card-text v-if="user" class="mt-3">
        <h3>{{ user.first }}</h3>
      </v-card-text>
    </ConfirmBox>
  </div>
</template>

<script>
import ConfirmBox from "~/components/ConfirmBox";
export default {
  layout: "admin",
  components: {
    ConfirmBox,
  },
  data() {
    return {
      user: null,
      del: false,
      loading: false,
      path: process.env.BASE_URL,
      users: [],
      headers: [
        {
          value: "photo",
          text: this.$t("image"),
        },
        {
          value: "first",
          text: this.$t("name"),
        },
        {
          value: "phone",
          text: this.$t("phone"),
        },
        {
          value: "email",
          text: this.$t("email"),
        },
        {
          value: "username",
          text: this.$t("username"),
        },
        {
          value: "auther",
          text: this.$t("auther"),
        },
        {
          value: "option",
          text: this.$t("option"),
        },
      ],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    openDel(item) {
      this.user = item;
      this.del = true;
    },
    async deleteAction() {
      try {
        let rs = await this.$axios.delete(`user/index/${this.user.id}`);
        this.$toast.success(this.$t("success"));
        this.del = false;
        let index = this.users.indexOf(this.user);
        this.users.splice(index, 1);
      } catch (error) {
        this.$toast.error(this.$t("cannot_delete"));
      }
    },
    async getData() {
      try {
        this.loading = true;
        let rs = await this.$axios.get("user", {
          params: {
            search: this.search,
          },
        });
        this.loading = false;
        this.users = rs.data.users;
      } catch (error) {
        this.loading = false;
      }
    },
  },
  computed: {
    search() {
      return this.$store.state.search;
    },
  },
  watch: {
    search(v) {
      this.getData();
    },
  },
};
</script>

<style></style>
