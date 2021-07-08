<template>
  <div>
    <v-container grid-list-xs>
      <v-row>
        <v-col>
          <h3 class="grey--text text--darken-2">{{ $t("cart") }}</h3>
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
  methods: {
    formatNumber(n) {
      return Number(n).toLocaleString();
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
