<template>
  <div>
    <v-container grid-list-xs fluid>
      <h4 class="mb-4">{{ $t("customer") }}</h4>
      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="customers"
            class="elevation-1"
          >
            <template v-slot:item.created_at="{ item }">
              <div>
                {{ formatDate(item.created_at) }}
              </div>
            </template>

            <template v-slot:item.status="{ item }">
              <v-chip small :color="getColor(item.status)" dark>
                {{ item.status }}
              </v-chip>
            </template>

            <template v-slot:item.option="{ item }">
              <div>
                <v-btn @click="openEdit(item)" color="success" icon>
                  <v-icon>mdi-pen</v-icon>
                </v-btn>
                <v-btn @click="openDel(item)" color="error" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <v-btn @click="add = true" color="primary" fixed bottom right fab>
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <AddCustomer v-model="add" @data="addCus" />
    <EditCustomer v-model="edit" :customer="customer" :data="getData()" />

    <confirm-box
      title="delete"
      v-model="dialogDel"
      okText="delete"
      @ok="deleteAction"
    >
      <v-card-text v-if="customer" class="mt-3">
        <h3>{{ customer.first }}</h3>
        <p>{{ customer.phone }}</p>
      </v-card-text>
    </confirm-box>
  </div>
</template>

<script>
import AddCustomer from "~/components/customer/AddCustomer";
import EditCustomer from "~/components/customer/EditCustomer";
import ConfirmBox from "~/components/ConfirmBox";

export default {
  layout: "admin",
  components: {
    AddCustomer,
    EditCustomer,
    ConfirmBox,
  },
  data() {
    return {
      add: false,
      edit: false,
      dialogDel: false,
      customer: null,
      loading: false,
      customers: [],
      headers: [
        {
          text: this.$t("name"),
          value: "first",
        },
        {
          text: this.$t("last"),
          value: "last",
        },
        {
          text: this.$t("phone"),
          value: "phone",
        },
        {
          text: this.$t("email"),
          value: "email",
        },
        {
          text: this.$t("date"),
          value: "created_at",
        },
        {
          text: this.$t("status"),
          value: "status",
        },
        {
          text: this.$t("option"),
          value: "option",
        },
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
    getColor(status) {
      let colors = { Pending: "grey", Approved: "primary", Blocked: "red" };
      return colors[status] || "grey";
    },
    addCus(data) {
      try {
        if (this.customers.length > 0) {
          this.customers.unshift(data);
        } else {
          this.customers.push(data);
        }
      } catch (error) {
        this.$toast.error(this.$t("fail") + `${error}`);
      }
    },
    openEdit(item) {
      try {
        this.customer = item;
        this.edit = true;
      } catch (error) {
        this.$toast.error(this.$t("fail") + `${error}`);
      }
    },
    async getData() {
      try {
        this.loading = true;
        let rs = await this.$axios.get("customer", {
          params: {
            search: this.$store.state.search,
          },
        });
        this.loading = false;
        this.customers = rs.data.customers;
      } catch (error) {
        this.loading = false;
        this.$toast.error(this.$t("fail"));
      }
      this.loading = false;
    },
    openDel(item) {
      this.customer = item;
      this.dialogDel = true;
    },
    async deleteAction() {
      try {
        let index = this.customers.indexOf(this.customer);
        this.customers.splice(index, 1);
        this.$toast.success(this.$t("success"));
        let rs = await this.$axios.delete(`customer/index/${this.customer.id}`);
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
