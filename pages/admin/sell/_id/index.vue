<template>
  <div>
    <v-container grid-list-xs>
      <v-row>
        <v-col>
          <v-layout row wrap>
            <h4>
              <v-btn @click="$router.back()" icon>
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              {{ $t("bill") }}
            </h4>
            <v-spacer></v-spacer>
            <v-btn
              :to="`/admin/sell/${$route.params.id}/edit`"
              color="primary"
              icon
            >
              <v-icon>mdi-pen</v-icon>
            </v-btn>
            <v-btn :to="`/admin/sell/${$route.params.id}/print`" icon>
              <v-icon>mdi-printer</v-icon>
            </v-btn>
          </v-layout>
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-if="customer">
          <h5>{{ $t("customer") }}</h5>
          <v-list-item class="pa-0">
            <v-list-item-content>
              <v-list-item-title
                >{{ customer.first }} {{ customer.last }}</v-list-item-title
              >
              <v-list-item-title>{{ customer.phone }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col v-if="emp">
          <h5>{{ $t("emp") }}</h5>
          <v-list-item class="pa-0">
            <v-list-item-content>
              <v-list-item-title
                >{{ emp.first }} {{ emp.last }}</v-list-item-title
              >
              <v-list-item-title class="subtitle red--text"
                >BILL ID : {{ $route.params.id }}</v-list-item-title
              >
              <v-list-item-title
                >{{ $t("date") }}:
                {{ formaDate(sell.sell_date) }}</v-list-item-title
              >
              <v-list-item-title
                >{{ $t("status") }}:
                <v-chip small>{{ $t(sell.status) }}</v-chip>
              </v-list-item-title>
              <v-list-item-title
                >{{ $t("status_payment") }}:
                <v-chip small>{{ $t(sell.status_payment) }}</v-chip>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
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

            <template v-slot:item.price="{ item }">
              <div>
                <b>{{ formatNumber(item.price) }}</b>
              </div>
            </template>

           
            <template v-slot:item.total="{ item }">
              <div>
                <b>{{ formatNumber(item.price * item.qty) }}</b>
              </div>
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
      items: [],
      sell: null,
      emp: null,
      customer: null,
      path: process.env.BASE_URL,
      headers: [
        { text: this.$t("image"), value: "cover" },
        { text: this.$t("name"), value: "name" },
        { text: this.$t("price"), value: "price", align: "price" },
        { text: this.$t("qty"), value: "qty", align: "right" },
        { text: this.$t("total"), value: "total", align: "right" },
        // { text: this.$t("option"), value: "option" },
      ],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    formatNumber(n) {
      return Number(n).toLocaleString();
    },
    formaDate(n) {
      return new Date(n).toLocaleString();
    },
    async getData() {
      try {
        let rs = await this.$axios.get("sell", {
          params: { id: this.$route.params.id },
        });
        this.items = rs.data.items;
        this.customer = rs.data.customer;
        this.sell = rs.data.sell;
        this.emp = rs.data.emp;
      } catch (error) {}
    },
    
  },
};
</script>

<style></style>
