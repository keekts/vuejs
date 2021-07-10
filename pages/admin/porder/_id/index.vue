<template>
  <div>
    <v-container grid-list-xs fluid>
      <v-row>
        <v-col>
          <v-layout wrap>
            <h5>{{ $t("porder") }}</h5>

            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              nuxt
              link
              :to="`/admin/porder/${$route.params.id}/pimport`"
              text
            >
              <v-icon>mdi-archive-arrow-down-outline</v-icon> &nbsp;
              {{ $t("import") }}
            </v-btn>
            <v-btn
              color="primary"
              nuxt
              link
              :to="`/admin/porder/${$route.params.id}/edit`"
              text
            >
              <v-icon>mdi-pen</v-icon> &nbsp;
              {{ $t("edit") }}
            </v-btn>
            <v-btn
              nuxt
              link
              :to="`/admin/porder/${$route.params.id}/print`"
              color="success"
              text
            >
              <v-icon>mdi-printer</v-icon> &nbsp;
              {{ $t("print") }}
            </v-btn>
          </v-layout>

          <v-divider class="mb-2"></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-if="porder">
          <h4 class="subtitle">ID : {{ $route.params.id }}</h4>
          {{ $t("date") }} : {{ formatDate(porder.purchaser_date) }}
        </v-col>
        <v-col v-if="supplier">
          <h4>
            <b>{{ $t("supplier") }}</b>
          </h4>
          <h5>{{ supplier.name }}</h5>
          <p>{{ $t("address") }} : {{ supplier.address }}</p>
          <div>{{ $t("phone") }} : {{ supplier.phone }}</div>
          <div>{{ $t("email") }}: {{ supplier.email }}</div>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="items"
            hide-default-footer
            :server-items-length="items.length"
          >
            <template v-slot:item.cover="{ item }">
              <v-avatar size="36" color="grey lighten-1">
                <img :src="path + item.cover" alt="alt" v-if="item.cover" />
                <v-icon v-else>mdi-book</v-icon>
              </v-avatar>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      porder: null,
      supplier: null,
      items: [],
      path: process.env.BASE_URL,
      headers: [
        { text: this.$t("image"), value: "cover" },
        { text: this.$t("name"), value: "name" },
        { text: this.$t("qty"), value: "qty" },
      ],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    formatDate(d) {
      return new Date(d).toLocaleDateString();
    },
    async getData() {
      try {
        let rs = await this.$axios.get("porder", {
          params: { id: this.$route.params.id },
        });
        this.supplier = rs.data.supplier;
        this.porder = rs.data.porder;
        this.items = rs.data.details;
      } catch (error) {}
    },
    removeItem(item) {
      try {
        let index = this.items.indexOf(item);
        this.items.splice(index, 1);
      } catch (error) {}
    },
  },
};
</script>

<style></style>
