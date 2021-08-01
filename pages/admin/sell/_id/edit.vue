<template>
  <div>
    <v-container grid-list-xs>
      <v-row>
        <v-col>
          <v-layout row wrap>
            <h4>
              <v-btn @click="$router.back()" icon>
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              {{ $t("bill") }}
            </h4>
            <v-spacer></v-spacer>

            <v-btn :to="`/admin/sell/${$route.params.id}/print`" icon>
              <v-icon>mdi-printer</v-icon>
            </v-btn>
          </v-layout>
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-if="customer">
          <h5>{{ $t("customer") }}</h5>
          <v-list-item class="pa-0">
            <v-list-item-content>
              <v-list-item-title
                >{{ customer.first }} {{ customer.last }}</v-list-item-title
              >
              <v-list-item-title>{{ customer.phone }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col v-if="emp">
          <h5>{{ $t("emp") }}</h5>
          <v-list-item class="pa-0">
            <v-list-item-content>
              <v-list-item-title
                >{{ emp.first }} {{ emp.last }}</v-list-item-title
              >
              <v-list-item-title class="subtitle red--text"
                >BILL ID : {{ $route.params.id }}</v-list-item-title
              >
              <v-list-item-title
                >{{ $t("date") }}:
                {{ formatDate(sell.sell_date) }}</v-list-item-title
              >
              <v-list-item-title
                >{{ $t("status") }}:
                <v-chip small>{{ $t(sell.status) }}</v-chip>
              </v-list-item-title>
              <v-list-item-title
                >{{ $t("status_payment") }}:
                <v-chip small>{{ $t(sell.status_payment) }}</v-chip>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
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
              <div>
                <b>{{ formatNumber(item.price) }}</b>
              </div>
            </template>

            <template v-slot:item.qty="{ item }">
              <div>
                <v-btn @click="setQty(item, (state = 0))" outlined icon small>
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                <b>{{ formatNumber(item.qty,'') }}</b>
                <v-btn @click="setQty(item, (state = 1))" outlined icon small>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
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

          <v-divider class="my-4"></v-divider>
          <v-layout wrap>
            <v-spacer></v-spacer>
            <div class="px-4">
              {{ $t("total") }} :
              <b class="green--text display-2">
                {{ formatNumber(total) }}
              </b>
            </div>
          </v-layout>
        </v-col>
      </v-row>
    </v-container>

    <ConfirmBox v-model="del" @ok="deleteAction" okText="delete">
      <v-card-text v-if="current" class="mt-3">
        <h3>{{ current.name }}</h3>
      </v-card-text>
    </ConfirmBox>

    <SelectBook v-model="selectBook" @select="addBook" />

    <v-btn @click="selectBook = true" color="pink" fab fixed bottom right dark>
      <v-icon>mdi-book-plus-outline</v-icon>
    </v-btn>
  </div>
</template>

<script>
import ConfirmBox from "~/components/ConfirmBox";
import SelectBook from "~/components/book/SelectBook";
import format from '~/mixins/format'
export default {
  layout: "admin",
  components: {
    ConfirmBox,
    SelectBook,
  },
  mixins:[format],
  data() {
    return {
      items: [],
      sell: null,
      emp: null,
      customer: null,
      current: null,
      del: false,
      selectBook: false,
      path: process.env.BASE_URL,
      headers: [
        { text: this.$t("image"), value: "cover", width: 60 },
        { text: this.$t("name"), value: "name" },
        { text: this.$t("price"), value: "price", align: "price" },
        { text: this.$t("qty"), value: "qty", align: "right" },
        { text: this.$t("total"), value: "total", align: "right" },
        { text: this.$t("option"), value: "option" },
      ],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        let rs = await this.$axios.get("sell", {
          params: { id: this.$route.params.id },
        });
        this.items = rs.data.items;
        this.customer = rs.data.customer;
        this.sell = rs.data.sell;
        this.emp = rs.data.emp;
      } catch (error) {}
    },
    openDelete(item) {
      this.current = item;
      this.del = true;
    },
    async deleteAction() {
      try {
        let index = this.items.indexOf(this.current);
        let rs = await this.$axios.delete(
          `selldetail/index/${this.current.id}`
        );
        this.items.splice(index, 1);
        this.$toast.success(this.$t("deleted"));
      } catch (error) {
        this.$toast.error(this.$t("fail") + " " + error.toString());
      }
    },
    async addBook(book) {
      try {
        let val = {
          book_id: book.id,
          qty: 1,
          price: book.price,
          sell_id: this.sell.id,
        };
        let check = this.items.some((e) => e.book_id == book.id);
        if (!check) {
          let rs = await this.$axios.post("selldetail", { input: val });
          this.getData();
          this.$toast.success(this.$t("saved"));
        } else {
          this.$toast.error(this.$t("have_data"));
        }
      } catch (error) {
        this.$toast.error(this.$t("fail") + " " + error.toString());
      }
    },
    async setQty(item, state = 1) {
      try {
        if (Number(item.qty) >= 1) {
          if (state == 1) {
            item["qty"] = Number(item.qty) + 1;
          } else {
            if (Number(item.qty) == 1) {
              return;
            }
            item["qty"] = Number(item.qty) - 1;
          }

          let rs = await this.$axios.put("selldetail/qty", {
            qty: 1,
            book_id: item.book_id,
            id: item.id,
            state: state,
          });
        }
      } catch (error) {
        this.$toast.error(this.$t("fail") + " " + error.toString());
      }
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
