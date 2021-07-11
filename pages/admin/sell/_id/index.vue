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
        <v-col>
          <section>
            <h5>{{ $t("emp") }}</h5>
            <v-list-item class="pa-0" v-if="emp">
              <v-list-item-content>
                <v-list-item-title
                  >{{ emp.first }} {{ emp.last }}</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="sell">
              <v-list-item-content>
                <v-list-item-title class="subtitle red--text">
                  <b>BILL ID : {{ $route.params.id }}</b>
                </v-list-item-title>
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
                <v-btn
                  @click.prevent="paymentAction()"
                  color="success"
                  v-if="sell.status_payment == 'wait'"
                  rounded
                  class="mt-2"
                  >{{ $t("pay_and_print") }}</v-btn
                >
              </v-list-item-content>
            </v-list-item>
          </section>
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

          <v-divider class="my-4"></v-divider>
          <v-layout wrap>
            <v-spacer></v-spacer>
            <div class="px-4">
              {{ $t("total") }} :
              <b class="green--text display-2">
                {{ formatNumber(total) }}
              </b>
            </div>
          </v-layout>
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
        { text: this.$t("image"), value: "cover", width: 60 },
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
    async paymentAction() {
      try {
        this.$toast.info(this.$t("please"));
        let rs = await this.$axios.put("sell", {
          input: {
            status_payment: "payed",
            status: "sell",
            emp_id: this.$auth.user.id,
          },
          id: this.$route.params.id,
        });
        // down stock

        let downBookQty = await this.$axios.post("selldetail/downQtyBook", {
          items: this.items,
        });
        this.$toast.success(this.$t("success"));
        this.$router.push(`/admin/sell/${this.$route.params.id}/print`);
      } catch (error) {
        this.$toast.error(this.$t("fail"));
      }
    },
  },
  computed: {
    total() {
      return this.items.reduce((a, b) => a + b.qty * b.price, 0);
    },
  },
};
</script>

<style></style>
