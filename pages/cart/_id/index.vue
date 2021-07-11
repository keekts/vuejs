<template>
  <div>
    <v-container grid-list-xs>
      <h4>{{ $t("old_order") }}</h4>

      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="items"
            :server-items-length="items.length"
            hide-default-footer
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

            <template v-slot:item.qty="{ item }">
              <div class="text-center">
                <b>{{ formatNumber(item.qty) }}</b>
              </div>
            </template>

            <template v-slot:item.total="{ item }">
              <div>
                <b>{{ formatNumber(item.price * item.qty) }}</b>
              </div>
            </template>

            <!-- <template v-slot:item.option="{ item }">
              <div>
                <v-btn @click="openDelete(item)" color="error" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </template> -->
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sell: null,
      items: [],
      path: process.env.BASE_URL,
      headers: [
        { text: this.$t("image"), value: "cover", width: 60 },
        { text: this.$t("name"), value: "name" },
        { text: this.$t("price"), value: "price", align: "price" },
        { text: this.$t("qty"), value: "qty", align: "right", width: 150 },
        { text: this.$t("total"), value: "total", align: "right" },
        // { text: this.$t("option"), value: "option" },
      ],
    };
  },
  mounted() {
    this.getCart();
  },
  methods: {
    formatNumber(n) {
      return Number(n).toLocaleString();
    },
    formatDate(n) {
      return new Date(n).toLocaleDateString();
    },
    async getCart() {
      try {
        let rs = await this.$axios.get("cart", {
          params: { id: this.$auth.user.id },
        });
        this.sell = rs.data.sell;
        this.items = rs.data.items;
      } catch (error) {}
    },
  },
};
</script>

<style></style>
