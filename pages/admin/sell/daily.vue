<template>
  <div>
    <v-container grid-list-xs fluid>
      <h3>{{ $t("report_daily") }}</h3>
      <v-layout wrap>
        <div>
          <v-text-field
            type="date"
            v-model="date"
            :label="$t('date')" @change="getReport()"
          ></v-text-field>
        </div>
        <div class="ma-2">
          <v-chip-group active-class="primary--text" v-model="mode" column @change="getItems()">
            <v-chip filter value="day">{{ $t("day") }}</v-chip>
            <v-chip filter value="month">{{ $t("month") }}</v-chip>
            <v-chip filter value="year">{{ $t("year") }}</v-chip>
          </v-chip-group>
        </div>
      </v-layout>
      <v-row>
        <v-col cols="12" md="4">
          <template v-for="(item, index) in reportItems">
            <v-card flat color="green lighten-4 mb-2" :key="index">
              <v-card-text>
                <h4>
                 {{$t('report')}} : {{item.on_time}}
                </h4>
              </v-card-text>
              <v-list-item>
                <v-list-item-title>{{ $t("profit") }}</v-list-item-title>
                <v-list-item-title class="title text-right green--text">
                  <b>
                    {{ formatNumber(item.detail.total - item.detail.cost) }}
                  </b>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>{{ $t("sell") }}</v-list-item-title>
                <v-list-item-title class="text-right title">
                  {{ formatNumber(item.detail.total) }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>{{ $t("cost") }}</v-list-item-title>
                <v-list-item-title class="title text-right red--text">
                  {{ formatNumber(item.detail.cost) }}
                </v-list-item-title>
              </v-list-item>
            </v-card>
          </template>
        </v-col>
        <v-col cols="12" md="8">
          <v-data-table :loading="loading"
            :headers="headers"
            :items="items"
            hide-default-footer
            :server-items-length="limit"
          >
            <template v-slot:item.id="{ item }">
              <div>
                <nuxt-link :to="`/admin/sell/${item.id}`">
                  {{ item.id }}
                </nuxt-link>
              </div>
            </template>
            <template v-slot:item.first="{ item }">
             <nuxt-link :to="`/admin/customer/${item.customer_id}`">
                  {{ item.first }} {{item.last}}
                </nuxt-link>
            </template>
            <template v-slot:item.total="{ item }">
              <div>{{ formatNumber(item.total) }}</div>
            </template>
            <template v-slot:item.sell_date="{ item }">
              <div>{{ formatDate(item.sell_date) }}</div>
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
      loading:false,
      date: new Date().toISOString().substring(0, 10),
      items: [],
      reportItems: [],
      mode: "day",
      headers: [
        { text: this.$t("id"), value: "id" },
        { text: this.$t("id"), value: "sell_date" },
        { text: this.$t("customer"), value: "first" },
        { text: this.$t("total"), value: "total" },
        // { text: this.$t("option"), value: "option" },
      ],
      limit: 10,
    };
  },
  mounted() {
    this.getReport();
    this.getItems();
  },
  methods: {
    formatNumber(n) {
      return Number(n || "0").toLocaleString();
    },
    formatDate(n) {
      return new Date(n).toLocaleString();
    },
    async getReport() {
      try {
        let rs = await this.$axios.get("sell/report", {
          params: { date: this.date, mode: this.mode || "day" },
        });
        this.reportItems = rs.data.items;
      } catch (error) {}
    },
    async getItems() {
      try {
        this.loading = true;
        let rs = await this.$axios.get("sell/reportItems", {
          params: { date: this.date, mode: this.mode || "day" },
        });
        this.loading = false;
        this.items = rs.data.sells;
      } catch (error) {
        this.loading = false;
      }
    },
  },
};
</script>

<style></style>
