<template>
  <div>
    <v-container grid-list-xs>
      <v-row>
        <v-col>
          <h4>{{ $t("supplier") }}</h4>
          <v-list-item v-if="supplier">
            <v-list-item-content>
              <v-list-item-title>{{ supplier.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ supplier.phone }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{
                supplier.address
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-btn
            @click="selectSupp = true"
            small
            rounded
            color="success"
            outlined
            >{{ $t("select") }}</v-btn
          >
        </v-col>
        <v-col>
          <v-text-field
            v-model="frm.purchaser_date"
            :label="$t('date')"
            type="date"
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
                ></v-text-field>
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
        </v-col>
        <v-col cols="12">
          <v-divider></v-divider>
          <v-btn @click="saveAction" color="primary" text>{{
            $t("save")
          }}</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <SelectSupplier v-model="selectSupp" @select="setSupplier" />
    <SelectBook v-model="selectBook" @select="addBook" />

    <v-btn @click="selectBook = true" color="primary" fab absolute bottom right>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import SelectSupplier from "~/components/supplier/SelectSupplier";
import SelectBook from "~/components/book/SelectBook";
export default {
  layout: "admin",
  components: {
    SelectSupplier,
    SelectBook,
  },
  data() {
    return {
      selectSupp: false,
      selectBook: false,
      supplier: null,
      path: process.env.BASE_URL,
      items: [],
      frm: {
        purchaser_date: new Date().toISOString().substring(0, 10),
      },
      headers: [
        { text: this.$t("image"), value: "cover" },
        { text: this.$t("name"), value: "name" },
        { text: this.$t("qty"), value: "qty" },
        { text: this.$t("option"), value: "option" },
      ],
    };
  },
  methods: {
    setSupplier(item) {
      this.supplier = item;
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
      } catch (error) {}
    },
    removeItem(item) {
      try {
        let index = this.items.indexOf(item);
        this.items.splice(index, 1);
      } catch (error) {}
    },
    async saveAction() {
      try {
        if (!this.supplier) {
          this.$toast.error(this.$t("pl_select_supplier"));
          return;
        }

        if (this.items.length < 1) {
          this.$toast.error(this.$t("pl_select_book"));
          return;
        }

        let porder = {
          emp_id: this.$auth.user.id,
          purchaser_date: this.frm.purchaser_date,
          supplier_id: this.supplier.id,
        };

        let rs_porder = await this.$axios.post("porder", { input: porder });

        let items = this.items.map((e) => {
          return {
            book_id: e.id,
            qty: e.qty,
            purchaser_order_id: rs_porder.data.porder.id,
          };
        });

        this.$axios.post("porderdetail/inserts", { input: items });
        this.$toast.success(this.$t("success"));
        this.$router.push(`/admin/porder/${rs_porder.data.porder.id}`)
      } catch (error) {
        this.$toast.error(this.$t("fail"));
      }
    },
  },
};
</script>

<style></style>
