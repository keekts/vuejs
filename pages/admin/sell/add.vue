<template>
  <div>
    <v-container grid-list-xs>
      <v-row>
        <v-col>
          <v-layout wrap>
            <h4>{{ $t("sell") }}</h4>
            <v-spacer></v-spacer>
            <v-btn to="/admin/sell" text color="primary">{{
              $t("sell_list")
            }}</v-btn>
          </v-layout>
          <div>
            <v-list-item v-if="customer" @click="selectCus = true">
              <v-list-item-avatar color="grey lighten-1" size="48">
                {{ customer.first[0].toUpperCase() }}
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ customer.first }}
                  {{ customer.last }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ customer.phone }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-else @click="selectCus = true">
              <v-list-item-avatar>
                <v-icon>mdi-account-plus-outline</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $t("select_customer") }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-col>
        <v-col>
          <v-text-field
            :label="$t('date')"
            type="date"
            v-model="sell_date"
          ></v-text-field>
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

            <template v-slot:item.qty="{ item }">
              <div style="max-width:100px">
                <v-text-field
                  v-model="item.qty"
                  type="number"
                  min="1"
                  filled
                  flat
                  solo
                  hide-details
                  class="subtitle"
                ></v-text-field>
              </div>
            </template>

            <template v-slot:item.price="{ item }">
              <div>
                <b>{{ formatNumber(item.price) }}</b>
              </div>
            </template>

            <template v-slot:item.total="{ item }">
              <div>
                <b>{{ formatNumber(item.price * item.qty) }}</b>
              </div>
            </template>

            <template v-slot:item.option="{ item }">
              <div>
                <v-btn @click="removeItem(item)" icon color="error">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </template>
          </v-data-table>

          <v-divider class="my-4"></v-divider>
          <v-layout wrap>
            <v-spacer></v-spacer>
            <div class="px-4">
              {{$t('total')}} : 
              <b class="green--text display-2">
                {{ formatNumber(total) }}
              </b>
            </div>
          </v-layout>

          <div class="mt-4">
            <v-btn @click="$router.back()" color="error" text>
              {{ $t("cancel") }}
            </v-btn>
            <v-btn @click.prevent="sellAction()" color="success">
              <v-icon>mdi-printer</v-icon>
              &nbsp; {{ $t("print_bill") }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-btn @click="selectBook = true" color="pink" fab fixed bottom right dark>
      <v-icon>mdi-book-plus</v-icon>
    </v-btn>

    <SelectBook v-model="selectBook" @select="addBook" />
    <SelectCustomer v-model="selectCus" @select="setCustomer" />
  </div>
</template>

<script>
import SelectBook from "~/components/book/SelectBook";
import SelectCustomer from "~/components/customer/SelectCustomer";

export default {
  layout: "admin",
  layout: "admin",
  components: {
    SelectBook,
    SelectCustomer,
  },
  data() {
    return {
      items: [],
      customer: null,
      selectBook: false,
      selectCus: false,
      path: process.env.BASE_URL,
      sell_date: new Date().toISOString().substring(0, 10),
      headers: [
        { text: this.$t("image"), value: "cover",width:60  },
        { text: this.$t("name"), value: "name" },
        { text: this.$t("price"), value: "price", align: "right" },
        { text: this.$t("qty"), value: "qty"},
        { text: this.$t("total"), value: "total", align: "right" },
        { text: this.$t("option"), value: "option" },
      ],
    };
  },
  mounted() {},
  methods: {
    formatNumber(n) {
      return Number(n).toLocaleString();
    },
    async sellAction() {
      try {
        if (!this.customer) {
          this.$toast.error(this.$t("pl_select_cus"));
          return;
        }

        if (this.items.length < 1) {
          this.$toast.error(this.$t("pl_select_book"));
          return;
        }

        this.$toast.info(this.$t("please"));

        let sellInput = {
          emp_id: this.$auth.user.id,
          sell_date: this.sell_date + " " + new Date().toTimeString(),
          customer_id: this.customer.id,
          status: "sell",
          status_payment: "payed",
        };

        let reqSell = await this.$axios.post("sell", { input: sellInput });

        let items = this.items.map((e) => {
          return {
            book_id: e.id,
            sell_id: reqSell.data.sell.id,
            qty: e.qty,
            price: e.price,
          };
        });

        let reqSellDetail = await this.$axios.post("selldetail/inserts", {
          input: items,
        });

        this.$router.push(`/admin/sell/${reqSell.data.sell.id}/print`);
      } catch (error) {
        this.$toast.error(this.$t("fail"));
      }
    },
    addBook(book) {
      try {
        let check = this.items.find((e) => e.id == book.id);
        if (!check) {
          book["qty"] = 1;
          this.items.push(book);
        } else {
          let index = this.items.indexOf(check);
          this.items[index]["qty"] = Number(this.items[index]["qty"]) + 1;
        }
      } catch (error) {
        this.$toast.error(this.$t("fail") + error.toString());
      }
    },
    removeItem(item) {
      try {
        let index = this.items.indexOf(item);
        this.items.splice(index, 1);
      } catch (error) {}
    },
    setCustomer(cus) {
      this.customer = cus;
      this.selectCus = false;
    },
  },
  computed: {
    total() {
      return this.items.reduce((a, b) => a + b.qty * b.price, 0);
    },
  },
};
</script>

<style></style>
