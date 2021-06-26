<template>
  <div>
    <v-container grid-list-xs>
      <v-row>
        <v-col>
          <h4 class="mb-4">
            <v-btn @click="$router.back()" icon>
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            {{ $t("sell_list") }}
          </h4>
          <v-data-table
            :headers="headers"
            :items="sells"
            :server-items-length="limit"
            hide-default-footer
            class="elevation-1"
          >
            <template v-slot:item.sell_date="{ item }">
              <div>
                {{ formatDate(item.sell_date) }}
              </div>
            </template>

            <template v-slot:item.status="{ item }">
              <div>
                {{ $t(item.status) }}
              </div>
            </template>

            <template v-slot:item.status_payment="{ item }">
              <div>
                <v-chip small>
                  {{ $t(item.status_payment) }}
                </v-chip>
                <v-btn :to="`/admin/sell/${item.id}`" color="primary" icon>
                  <v-icon>mdi-link</v-icon>
                </v-btn>
              </div>
            </template>
          </v-data-table>
          <v-pagination :length="pageTotal" v-model="page"></v-pagination>
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
      sells: [],
      limit: 20,
      page: 1,
      pageTotal: 0,
      headers: [
        {
          text: this.$t("id"),
          value: "id",
          width: 60,
        },
        {
          text: this.$t("name"),
          value: "first",
        },
        {
          text: this.$t("date"),
          value: "sell_date",
        },
        {
          text: this.$t("status"),
          value: "status",
        },
        {
          text: this.$t("status_payment"),
          value: "status_payment",
        },
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
    formatDate(n) {
      return new Date(n).toLocaleString();
    },
    async getData() {
      try {
        let rs = await this.$axios.get("sell", {
          params: {
            limit: this.limit,
            offset: (this.page - 1) * this.limit,
            search: this.search,
          },
        });
        this.sells = rs.data.sells;
        this.pageTotal = Math.ceil(rs.data.total / this.limit);
      } catch (error) {
        console.log(error);
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
