<template>
  <div>
    <v-container grid-list-xs fluid>
      <h2 class="mb-4">{{ $t("sys") }}</h2>
      <v-row>
        <v-col >
          <card-box
            :title="`${users}`"
            :desc="$t('emp')"
            icon="mdi-account"
            avatarColor="primary"
            to="/admin/emp"
          ></card-box>
        </v-col>
        <v-col>
          <card-box
            :title="`${porders}`"
            :desc="$t('porder')"
            icon="mdi-file-upload-outline"
            avatarColor="blue"
            to="/admin/porder"
          ></card-box>
        </v-col>
        <v-col>
          <card-box
            :title="`${imports}`"
            :desc="$t('import')"
            icon="mdi-file-download-outline"
            avatarColor="indigo"
            to="/admin/pimport"
          ></card-box>
        </v-col>
        <v-col>
          <card-box
            :title="`${suppliers}`"
            :desc="$t('supplier')"
            icon="mdi-account-group-outline"
            avatarColor="teal"
            to="/admin/supplier"
          ></card-box>
        </v-col>
      </v-row>

      <v-row class="mt-4">
        <v-col>
          <v-layout wrap>
            <h3 class="grey--text text--darken-3">{{ $t("recent_porder") }}</h3>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </v-layout>
          <v-divider></v-divider>
          <v-list class="pa-0">
            <template v-for="(item, index) in lastPorders">
              <v-list-item
                :to="`/admin/porder/${item.id}`"
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
                    {{ formatDate(item.purchaser_date) }}
                  </small>
                </v-list-item-action>
              </v-list-item>
            </template>
            <v-skeleton-loader
              type="card-avatar, article"
              height="300"
              v-if="loading"
            ></v-skeleton-loader>
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
    </v-container>
  </div>
</template>

<script>
import CardBox from "~/components/CardBox";
import CardDashboard from "~/components/CardDashboard";
import BarChart from "~/components/chart/BarChart.js";
import chartOption from "~/mixins/chartOption";
import color from "~/helper/colors";
import format from "~/mixins/format";

export default {
  layout: "admin",
  middleware: "user",
  components: {
    CardBox,
    CardDashboard,
    BarChart,
  },
  mixins: [chartOption,format],
  data() {
    return {
      users: 0,
      porders: 0,
      imports: 0,
      suppliers: 0,
      dataChart: null,
      lastPorders: [],
      loading: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    
    async getData() {
      try {
        this.loading = true;
        let rs = await this.$axios.get("setting");

        let reqPorder = await this.$axios.get("porder", {
          params: {
            limit: 4,
          },
        });
        this.lastPorders = reqPorder.data.porders;

        this.users = rs.data.users;
        this.imports = rs.data.imports;
        this.porders = rs.data.porders;
        this.suppliers = rs.data.suppliers;

        this.dataChart = {
          labels: rs.data.chart_porder.map((e) => e.date),
          datasets: [
            {
              label: this.$t("porder"),
              backgroundColor: color.colors,
              data: rs.data.chart_porder.map((e) => e.count),
            },
          ],
        };
        this.loading = false;
      } catch (error) {
        this.loading = true;
      }
    },
  },
};
</script>

<style></style>
