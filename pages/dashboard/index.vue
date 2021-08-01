<template>
  <div>
    <v-container grid-list-xs fluid>
      <v-row>
        <v-col>
          <CardBox
            avatarColor="primary"
            titleClass="primary--text"
            icon="mdi-cart-plus"
            :desc="$t('sell')"
            title=""
            to="admin/sell/add"
            fileSize=""
            color="grey lighten-4"
          ></CardBox>
        </v-col>
        <v-col>
          <CardBox
            avatarColor="primary"
            titleClass="primary--text"
            icon="mdi-cart-outline"
            :desc="$t('order_list')"
            :title="`${orders}`"
            to="admin/sell/order"
            fileSize=""
            color="grey lighten-4"
            flat
          ></CardBox>
        </v-col>
        <v-col>
          <CardBox
            avatarColor="amber"
            titleClass="amber--text"
            icon="mdi-book"
            :desc="$t('book')"
            :title="`${books}`"
            to="admin/book"
            fileSize=""
            color="grey lighten-4"
            flat
          />
        </v-col>
        <v-col>
          <CardBox
            :desc="$t('customer')"
            :title="`${customers}`"
            to="admin/customer"
            icon="mdi-account"
            fileSize=""
            color="grey lighten-4"
            flat
          />
        </v-col>
        <!-- <v-col>
        <CardBox avatarColor="indigo" titleClass="indigo--text" icon="mdi-file" :desc="$t('porder')" :title="`${books}`" to="admin/porder" fileSize="" color="grey lighten-4" flat></CardBox>
      </v-col>
      <v-col md="3">
        <CardDashboard avatarColor="blue" titleClass="blue--text" icon="mdi-file" fileCount="" :title="$t('import')" to="admin/pimport" fileSize="" color="grey lighten-4" flat></CardDashboard>
      </v-col> -->
      </v-row>

      <v-row class="my-4">
        <v-col>
          <v-layout wrap>
            <h3 class="grey--text text--darken-3">{{ $t("last_order") }}</h3>
            <v-spacer></v-spacer>
            <v-btn icon to="/admin/porder">
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </v-layout>

          <v-list class="pa-0">
            <template v-for="(item, index) in recent_orders">
              <v-list-item
                :to="`/admin/sell/${item.id}`"
                :key="index"
                class="px-0"
              >
                <v-list-item-avatar size="48" color="grey lighten-3">
                  <h3 class="title" color="grey">
                    {{ item.first[0].toUpperCase() }}
                  </h3>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.first }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    ID: {{ item.id }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <small class="grey--text">
                    {{ formatDate(item.sell_date) }}
                  </small>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list>
        </v-col>
        <v-col>
          <v-card>
            <BarChart
              :data="dataChart"
              v-if="dataChart"
              style="max-height:300px"
              :options="chartOption"
            />
            <v-skeleton-loader
              type="card-avatar, article"
              height="300"
              v-if="loading"
            ></v-skeleton-loader>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="my-4">
        <v-col>
          <v-card :loading="loading">
            <v-card-title primary-title>
              {{ $t("book_row_qty") }}
            </v-card-title>
            <v-divider></v-divider>
            <v-data-table
              :headers="headers"
              :items="bookItems"
              hide-default-footer
              loading="true"
            >
              <template v-slot:item.cover="{ item }">
                <div>
                  <v-avatar size="36" color="grey" v-if="item.cover">
                    <v-img :src="path + item.cover"></v-img>
                  </v-avatar>
                  <v-icon v-else class="mdi-36px">mdi-book</v-icon>
                </div>
              </template>
              <template v-slot:item.price="{ item }">
                <b>
                  {{ formatNumber(item.price) }}
                </b>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <v-col>
          <v-card outlined>
            <v-card-title primary-title>
              {{ $t("book_type_sell") }}
            </v-card-title>
            <v-card-text>
              <DoughnutChart
                :data="dataChartBook"
                v-if="dataChartBook"
                :options="chartOption2"
                style="max-height:270px"
              />
              <v-skeleton-loader
                type="card-avatar, article"
                height="300"
                v-if="loading"
              ></v-skeleton-loader>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-btn to="/admin/sell" color="primary" fab fixed bottom right>
      <v-icon>mdi-cart-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import CardBox from "~/components/CardBox";
import CardDashboard from "~/components/CardDashboard";
import BarChart from "~/components/chart/BarChart.js";
import DoughnutChart from "~/components/chart/DoughnutChart.js";
import LineChart from "~/components/chart/LineChart.js";
import chartOption from "~/mixins/chartOption";
import color from "~/helper/colors";
import format from '~/mixins/format'
export default {
  layout: "admin",
  components: {
    CardDashboard,
    CardBox,
    BarChart,
    DoughnutChart,
    LineChart,
  },
  mixins: [chartOption,format],
  data() {
    return {
      path: process.env.BASE_URL,
      bookItems: [],
      users: 0,
      books: 0,
      orders: 0,
      customers: 0,
      loading: false,
      chartOption2: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: "right",
          labels: {
            fontFamily: "Bouasavanh",
          },
        },
      },
      dataChart: null,
      dataChartBook: null,
      recent_orders: [],
      headers: [
        {
          text: this.$t("image"),
          value: "cover",
        },
        {
          text: this.$t("name"),
          value: "name",
        },
        {
          text: this.$t("price"),
          value: "price",
        },
        {
          text: this.$t("qty"),
          value: "qty",
        },
      ],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        this.loading = true;
        let rs = await this.$axios.get("dashboard");
        let book = await this.$axios.get("book/qtyRow", {
          params: {
            limit: 6,
          },
        });

        this.recent_orders = rs.data.recent_orders;
        this.bookItems = book.data.books;
        this.customers = rs.data.customers;
        this.orders = rs.data.orders;
        this.users = rs.data.users;
        this.books = rs.data.books;

        let { sell_data_chart } = rs.data;

        this.dataChart = {
          labels: sell_data_chart.map((e) => e.date),
          datasets: [
            {
              label: this.$t("top_order"),
              backgroundColor: color.colors,
              data: sell_data_chart.map((e) => e.total),
            },
          ],
        };

        this.dataChartBook = {
          labels: rs.data.chart_book.map((e) => e.type_name),
          datasets: [
            {
              label: this.$t("top_order"),
              backgroundColor: color.colors,
              data: rs.data.chart_book.map((e) => e.count),
            },
          ],
        };
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
  },
};
</script>

<style></style>
