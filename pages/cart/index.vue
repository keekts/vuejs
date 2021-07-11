<template>
  <div>
    <v-container grid-list-xs>
      <v-row>
        <v-col>
          <h3 class="grey--text text--darken-2">{{ $t("cart") }}</h3>
          <section class="my-2" v-if="sell">
            <v-card outlined :to="`/cart/${sell.id}`">
              <v-card-text>
                <h4>{{ $t("old_order") }}</h4>
              </v-card-text>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ formatDate(sell.sell_date) }}</v-list-item-title>
                  <v-list-item-subtitle>{{ sell.status }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </section>

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
                <v-text-field
                  @click:prepend-inner="setQty(item, 0)"
                  @click:append="setQty(item, 1)"
                  prepend-inner-icon="mdi-minus"
                  append-icon="mdi-plus"
                  outlined
                  hide-details
                  dense
                  readonly
                  :value="item.qty"
                ></v-text-field>
              </div>
            </template>

            <template v-slot:item.total="{ item }">
              <div>
                <b>{{ formatNumber(item.price * item.qty) }}</b>
              </div>
            </template>

            <template v-slot:item.option="{ item }">
              <div>
                <v-btn @click="openDelete(item)" color="error" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </template>
          </v-data-table>
          <v-divider class="my-3"></v-divider>
          <div class=" text-right">
            <h2 class="display-2 teal--text">{{ formatNumber(total) }} LAK</h2>
            {{ $t("total") }}
          </div>
          <v-divider class="my-4"></v-divider>
          <v-btn
            @click.prevent="confirmAction()"
            color="teal"
            :disabled="!$auth.loggedIn"
            v-show="items.length > 0"
            dark
            >{{ $t("confirm_order") }}</v-btn
          >
          <v-alert type="warning" v-show="!$auth.loggedIn" class="my-2">
            {{ $t("pl_register") }}
          </v-alert>
        </v-col>
      </v-row>

      <v-row>
        <v-col></v-col>
      </v-row>
    </v-container>

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
  components: {
    ConfirmBox,
  },
  data() {
    return {
      path: process.env.BASE_URL,
      current: null,
      sell: null,
      del: false,
      headers: [
        { text: this.$t("image"), value: "cover", width: 60 },
        { text: this.$t("name"), value: "name" },
        { text: this.$t("price"), value: "price", align: "price" },
        { text: this.$t("qty"), value: "qty", align: "right", width: 150 },
        { text: this.$t("total"), value: "total", align: "right" },
        { text: this.$t("option"), value: "option" },
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
    async setQty(item, state = 1) {
      try {
        if (Number(item.qty) >= 1) {
          if (state == 1) {
            this.$store.commit("cart/increment", item.id);
          } else {
            if (Number(item.qty) == 1) {
              return;
            }
            this.$store.commit("cart/decrement", item.id);
          }
        }
      } catch (error) {
        this.$toast.error(this.$t("fail"));
      }
    },
    openDelete(item) {
      this.current = item;
      this.del = true;
    },
    deleteAction() {
      try {
        this.$store.commit("cart/removeCart", this.current.id);
      } catch (error) {}
    },
    async confirmAction() {
      try {
        this.$toast.info(this.$t("please"));
        let input = {
          customer_id: this.$auth.user.id,
          status: "order",
          status_payment: "wait",
        };
        let rs = await this.$axios.post("cart", {
          input: input,
          items: this.items,
        });
        this.$toast.success(this.$t("success"));
        this.$store.commit("cart/removeAll");
        this.getCart()
      } catch (error) {
        this.$toast.erorr(this.$t("fail"));
      }
    },
    async getCart() {
      try {
        if (this.$auth.loggedIn);
        let rs = await this.$axios.get("cart", {
          params: { id: this.$auth.user.id },
        });
        this.sell = rs.data.sell;
      } catch (error) {
      }
    },
  },
  computed: {
    items() {
      return this.$store.state.cart.carts;
    },
    total() {
      return this.items.reduce((a, b) => a + b.qty * b.price, 0);
    },
  },
};
</script>

<style></style>
