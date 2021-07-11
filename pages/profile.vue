<template>
  <div>
    <v-container grid-list-xs>
      <h4>{{ $t("profile") }}</h4>
      <v-divider class="my-2s"></v-divider>
      <v-row v-if="cus">
        <v-col>
          <v-list-item class="pa-0">
            <v-list-item-avatar size="48" color="grey lighten-2">
              <v-icon>mdi-account</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                >{{ cus.first }} {{ cus.last }}</v-list-item-title
              >
              <v-list-item-subtitle>{{ $t("name") }}</v-list-item-subtitle>
              <v-list-item-subtitle>
                <v-chip color="primary" small>{{ cus.status }}</v-chip>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn @click="dialog = true" icon>
                <v-icon>mdi-pen</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <template v-for="(item, index) in cols">
            <v-list-item :key="index" class="pa-0">
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

    <v-dialog
      v-model="dialog"
      scrollable
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card v-if="cus">
        <v-card-title primary-title>
          {{ $t("edit") }}
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="cus.first" :label="$t('name')"></v-text-field>
          <v-text-field v-model="cus.last" :label="$t('last')"></v-text-field>
          <v-text-field v-model="cus.phone" :label="$t('phone')"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" text>{{ $t("cancel") }}</v-btn>
          <v-btn @click.prevent="updateProfile()" color="primary" text>{{
            $t("ok")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  head() {
    return { title: "sell" };
  },
  data() {
    return {
      cus: null,
      dialog: false,
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
    this.getProfile();
  },
  methods: {
    async getProfile() {
      try {
        let rs = await this.$axios.get("welcome/profile", {
          params: { id: this.$auth.user.id },
        });
        this.cus = rs.data.user;
      } catch (error) {}
    },
    async updateProfile() {
      if (!this.cus.first || !this.cus.phone) {
        this.$toast.error(this.$t("please"));
        return;
      }
      try {
        let rs = await this.$axios.put("welcome", {
          input: {
            first: this.cus.first,
            last: this.cus.first,
            email: this.cus.email,
            phone: this.cus.phone,
          },
          id: this.$auth.user.id,
        });
        this.dialog = false;
      } catch (error) {}
    },
  },
};
</script>

<style></style>
