<template>
  <div>
    <v-container grid-list-xs fluid>
      <h4>
        <v-btn @click="$router.back()" icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        {{ $t("customer") }}
      </h4>
      <v-row v-if="cus">
        <v-col>
          <v-list-item>
            <v-list-item-avatar size="48" color="grey lighten-2">
              <v-icon>mdi-account</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                >{{ cus.first }} {{ cus.last }}</v-list-item-title
              >
              <v-list-item-subtitle>{{ $t("name") }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <template v-for="(item, index) in cols">
            <v-list-item :key="index">
              <v-list-item-avatar size="48" color="grey lighten-2">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{
                  cus[item.value] || $t("no_data")
                }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  $t(item.value)
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
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
      cus: null,
      loading: false,
      cols: [
        {
          text: this.$t("phone"),
          value: "phone",
          icon: "mdi-card-account-phone-outline",
        },
        { text: this.$t("email"), value: "email", icon: "mdi-email-outline" },
      ],
    };
  },
  mounted() {
    this.getCus();
  },
  methods: {
    async getCus() {
      try {
        this.loading = true;
        let rs = await this.$axios.get("customer", {
          params: { id: this.$route.params.id },
        });
        this.cus = rs.data.customer;
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
  },
};
</script>

<style></style>
