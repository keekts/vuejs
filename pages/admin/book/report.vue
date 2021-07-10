<template>
  <div>
    <v-container grid-list-xs fluid>
      <h3>{{ $t("report_book") }}</h3>
      <v-row>
        <v-col>
          <v-data-table :headers="headers" :items="books" hide-default-footer :server-items-length="limit"> 
            <template v-slot:item.qty="{ item }">
              <div>
                <b class="red--text" v-if="item.qty < 5">{{
                  toForrmat(item.qty)
                }}</b>
                <b class="green--text" v-else>{{ toForrmat(item.qty) }}</b>
              </div>
            </template>
            <template v-slot:item.price="{ item }">
              <div>
                <b class="green--text">{{ toForrmat(item.price) }}</b>
              </div>
            </template>
            <template v-slot:item.price_cost="{ item }">
              <div>
                <b class="red--text">{{ toForrmat(item.price_cost) }}</b>
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-pagination
        @input="getData"
        :length="pageTotal"
        total-visible="7"
        v-model="page"
      ></v-pagination>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      books: [],
      page: 1,
      limit: 20,
      total: 0,
      pageTotal: 0,
      searching: false,
      headers: [
        { text: this.$t("name"), value: "name" },
        { text: this.$t("qty"), value: "qty" },
        { text: this.$t("price"), value: "price", align: "right" },
        { text: this.$t("price_cost"), value: "price_cost", align: "right" },
      ],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    toForrmat(n) {
      return Number(n).toLocaleString();
    },

    async getData() {
      try {
        this.searching = true;
        let rs = await this.$axios.get("book", {
          params: {
            limit: this.limit,
            offset: (this.page - 1) * this.limit,
            search: this.search,
          },
        });
        this.books = rs.data.results;
        this.pageTotal = Math.ceil(rs.data.total / this.limit);
        this.searching = false;
      } catch (error) {
        this.$toast.error(this.$t("fail"));
        this.searching = false;
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
