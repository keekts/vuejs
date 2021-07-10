<template>
  <div>
    <v-container grid-list-xs>
      <v-row>
        <v-col>
          <v-layout wrap>
            <h5>
              <v-btn @click="$router.back()" icon>
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              {{ $t("import") }}
            </h5>

            <v-spacer></v-spacer>
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
          <div style="max-width:200px">
            <v-text-field
              v-model="import_date"
              :label="$t('date')"
              type="date"
            ></v-text-field>
          </div>
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
              <div style="max-width:150px">
                <v-text-field
                  v-model="item.price"
                  type="number"
                  min="1"
                  filled
                  flat
                  solo
                  hide-details
                ></v-text-field>
              </div>
            </template>

            <template v-slot:item.give_qty="{ item }">
              <div style="max-width:100px">
                <v-text-field
                  v-model="item.give_qty"
                  type="number"
                  min="1"
                  filled
                  flat
                  solo
                  hide-details
                ></v-text-field>
              </div>
            </template>

            <template v-slot:item.option="{ item }">
              <div>
                <v-btn
                  v-if="item.apply"
                  @click="setApply(item)"
                  color="success"
                  depressed
                  rounded
                  outlined
                  small
                  >{{ $t("imported") }}</v-btn
                >
                <v-btn
                  v-else
                  color="success"
                  @click="setApply(item)"
                  rounded
                  small
                  >{{ $t("import") }}</v-btn
                >
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
      porder: null,
      supplier: null,
      items: [],
      path: process.env.BASE_URL,
      import_date: new Date().toISOString().substring(0, 10),
      headers: [
        { text: this.$t("image"), value: "cover" },
        { text: this.$t("name"), value: "name" },
        { text: this.$t("order_qty"), value: "qty" },
        { text: this.$t("last_stock_qty"), value: "post_to_stock" },
        { text: this.$t("price"), value: "price" },
        { text: this.$t("give_qty"), value: "give_qty" },
        { text: this.$t("option"), value: "option" },
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
        this.items = rs.data.details.map((e) => {
          e["give_qty"] = e.qty;
          e["price"] = "";
          e["apply"] = false;
          return e;
        });
      } catch (error) {}
    },
    async setApply(item) {
      try {
        if (item.price < 1) {
          this.$toast.error(this.$t("val_price"));
          return;
        }

        item["apply"] = !item["apply"];

        let val = {
          purchaser_detail_id: item.id,
          qty: item.give_qty,
          import_date: this.import_date,
          price: item.price,
        };
        let rs = await this.$axios.post("import", {
          input: val,
          book_id: item.book_id,
        });
        this.$toast.success(this.$t("success"));
      } catch (error) {
        this.$toast.error(this.$t("fail"));
      }
    },
  },
};
</script>

<style></style>
