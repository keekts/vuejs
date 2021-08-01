<template>
  <div>
    <v-container grid-list-xs fluid>
      <v-row>
        <v-col>
          <h4>{{ $t("porder") }}</h4>
          <v-data-table
            :headers="headers"
            :items="porders"
            class="elevation-1 mt-2"
          >
            <template v-slot:item.purchaser_date="{ item }">
              <div>
                {{ formatDate(item.purchaser_date) }}
              </div>
            </template>
            <template v-slot:item.option="{ item }">
              <div>
                <v-btn link nuxt :to="`/admin/porder/${item.id}/pimport`"  color="primary" icon>
                  <v-icon>mdi-archive-arrow-down-outline</v-icon>
                </v-btn>
                <v-btn link nuxt :to="`/admin/porder/${item.id}/edit`" icon>
                  <v-icon>mdi-pen</v-icon>
                </v-btn>
                <v-btn @click="openDel(item)" icon color="error">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <v-btn
      nuxt
      link
      to="/admin/porder/add"
      color="primary"
      fab
      absolute
      bottom
      right
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

  </div>
</template>

<script>
import format from '~/mixins/format'
export default {
  layout: "admin",
  mixins:[format],
  data() {
    return {
      porders: [],
      headers: [
        { text: this.$t("id"), value: "id", width: 50 },
        { text: this.$t("name"), value: "first" },
        { text: this.$t("date"), value: "purchaser_date" },
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
        let reqPorder = await this.$axios.get("porder", {
          params: {
            limit: 10,
            search: this.search,
          },
        });
        this.porders = reqPorder.data.porders;
      } catch (error) {}
    },
    openDel(item) {},
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
