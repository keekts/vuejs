<template>
  <div>
    <v-container grid-list-xs fluid>
      <v-row class="hide-print">
        <v-col>
          <v-layout wrap>
            <v-btn icon @click="$router.back()">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="print()" color="success" text>
              <v-icon>mdi-printer</v-icon> &nbsp;
              {{ $t("print") }}
            </v-btn>
          </v-layout>

          <v-divider class="mb-2"></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <h2 class="text-center">{{$t('porder')}}</h2>
          <v-divider></v-divider>
        </v-col>
         <v-col v-if="porder">
          <div>
            <img src="@/static/icon.png" width="60" alt="alt" />
          </div>
          <h3>
            <b class="title">The Book</b>
          </h3>
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
          <v-card outlined>
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
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "print",
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
    print() {
      window.print();
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

<style>
@media print {
  .hide-print {
    display: none;
  }
}
</style>
