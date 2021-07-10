<template>
  <div>
    <v-container grid-list-xs fluid>
      <v-row>
        <v-col>
          <h4>
            <v-btn @click="$router.back()" icon>
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            {{ $t("import_list") }}
          </h4>
          <v-data-table
            :headers="headers"
            :items="items"
            hide-default-footer
            class="mt-2"
          >
            <template v-slot:item.cover="{ item }">
              <v-avatar size="36" color="grey lighten-1">
                <img :src="path + item.cover" alt="alt" v-if="item.cover" />
                <v-icon v-else>mdi-book</v-icon>
              </v-avatar>
            </template>

            <template v-slot:item.book_price="{ item }">
              <b>{{ formatNumber(item.book_price) }}</b>
            </template>

            <template v-slot:item.import_date="{ item }">
              <span>{{ formatDate(item.import_date) }}</span>
            </template>

            <template v-slot:item.price="{ item }">
              <b class="red--text">{{ formatNumber(item.price) }}</b>
            </template>

            <template v-slot:item.option="{ item }">
              <div>
                <v-btn @click="openDelete(item)" color="error" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </template>
          </v-data-table>
          <v-pagination
            :length="pageTotal"
            v-model="page"
            @input="getData()"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>
    <v-btn color="primary" fab absolute bottom right to="/admin/porder">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <ConfirmBox v-model="del" @ok="deleteAction" okText="delete">
      <v-card-text v-if="current" class="mt-3">
        <h3>{{ current.name }}</h3>
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
      items: [],
      pageTotal: 0,
      page: 1,
      limit: 12,
      current: null,
      del: false,
      path: process.env.BASE_URL,
      headers: [
        { text: this.$t("image"), value: "cover" },
        { text: this.$t("name"), value: "name" },
        { text: this.$t("pid"), value: "purchaser_order_id" },
        { text: this.$t("date"), value: "import_date", align: "right" },
        { text: this.$t("sell"), value: "book_price", align: "right" },
        { text: this.$t("buy"), value: "price", align: "right" },
        { text: this.$t("order_qty"), value: "qty", align: "right" },
        {
          text: this.$t("last_stock_qty"),
          value: "post_to_stock",
          align: "right",
        },
        { text: this.$t("option"), value: "option" },
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
      return new Date(n).toLocaleDateString();
    },
    async getData() {
      let rs = await this.$axios.get("import", {
        params: { limit: this.limit, offset: (this.page - 1) * this.limit,search: this.search },
      });
      this.items = rs.data.imports;
      this.pageTotal = Math.ceil(Number(rs.data.total) / this.limit);
    },
    openDelete(item) {
      this.current = item;
      this.del = true;
    },
    async deleteAction() {
      try {
        let rs = await this.$axios.delete(`import/index/${this.current.id}`);
        this.del = false;
        let index = this.items.indexOf(this.current);
        this.items.splice(index, 1);
        this.$toast.success(this.$t("deleted"));
      } catch (error) {
        this.$toast.error(this.$t("cannot_delete"));
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
