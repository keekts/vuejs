<template>
  <div>
    <v-container grid-list-xs fluid>
      <v-row>
        <v-col>
          <v-layout wrap>
            <h5>{{ $t("porder") }}</h5>

            <v-spacer></v-spacer>

            <v-btn
              nuxt
              link
              :to="`/admin/porder/${$route.params.id}/print`"
              color="success"
              text
            >
              <v-icon>mdi-printer</v-icon> &nbsp;
              {{ $t("print") }}
            </v-btn>
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
                  @change="updateAction(item)"
                ></v-text-field>
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
        </v-col>
      </v-row>
    </v-container>

    <ConfirmBox v-model="del" @ok="deleteAction" okText="delete">
      <v-card-text v-if="detail" class="mt-3">
        <h3>{{ detail.name }} ({{ detail.qty }})</h3>
      </v-card-text>
    </ConfirmBox>

    <SelectBook v-model="selectBook" @select="addBook" />

    <v-btn @click="selectBook = true" color="primary" fab absolute bottom right>
      <v-icon>mdi-plus</v-icon>
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
      selectBook: false,
      detail: null,
      porder: null,
      supplier: null,
      del: false,
      items: [],
      path: process.env.BASE_URL,
      headers: [
        { text: this.$t("image"), value: "cover" },
        { text: this.$t("name"), value: "name" },
        { text: this.$t("qty"), value: "qty" },
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
        let rs = await this.$axios.get("porder", {
          params: { id: this.$route.params.id },
        });
        this.supplier = rs.data.supplier;
        this.porder = rs.data.porder;
        this.items = rs.data.details;
      } catch (error) {}
    },
    openDelete(item) {
      this.detail = item;
      this.del = true;
    },
    async updateAction(item) {
      try {
        let rs = await this.$axios.put("porderdetail", {
          input: { qty: item.qty },
          id: item.id,
        });
      } catch (error) {}
    },
    async deleteAction() {
      try {
        let rs = await this.$axios.delete(
          `porderdetail/index/${this.detail.id}`
        );
        this.$toast.success(this.$t("success"));
        this.del = false;
        let index = this.items.indexOf(this.detail);
        this.items.splice(index, 1);
      } catch (error) {
        this.$toast.error(this.$t("cannot_delete"));
      }
    },
    addBook(book) {
      try {
        let check = this.items.find((e) => e.id == book.id);
        if (!check) {
          this.$axios.post("porderdetail", {
            input: {
              book_id: book.id,
              purchaser_order_id: this.porder.id,
              qty: 1,
            },
          });
          
        }
        this.getData();
      } catch (error) {}
    },
  },
};
</script>

<style></style>
