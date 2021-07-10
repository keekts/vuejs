<template>
  <div>
    <v-container grid-list-xs fluid>
      <h3>{{ $t("report_daily") }}</h3>
      <v-layout wrap>
        <div>
          <v-text-field
            type="date"
            v-model="date"
            :label="$t('date')"
          ></v-text-field>
        </div>
        <div class="ma-2">
          <v-chip-group active-class="primary--text" column>
            <v-chip filter value="day">{{ $t("day") }}</v-chip>
            <v-chip filter value="month">{{ $t("month") }}</v-chip>
            <v-chip filter value="year">{{ $t("year") }}</v-chip>
          </v-chip-group>
        </div>
      </v-layout>
      <v-row>
        <v-col cols="12" md="4">
          <v-layout wrap justify-space-between>
            <div>{{ $t("day") }} {{ date }}</div>
            <div>
              <v-list-item-title class="display-1 text-right">
                <b>10</b>
              </v-list-item-title>
            </div>
          </v-layout>

          <v-layout wrap justify-space-between>
            <div>{{ $t("profit") }}</div>
            <div>
              <v-list-item-title class="display-1 text-right green--text">
                <b>1,000</b>
              </v-list-item-title>
            </div>
          </v-layout>

          <v-layout wrap justify-space-between>
            <div>
              {{ $t("sell") }}
              <v-list-item-title>
                <b>1,000</b>
              </v-list-item-title>
            </div>

            <div>
              {{ $t("cost") }}
              <v-list-item-title>
                <b>1,000</b>
              </v-list-item-title>
            </div>
          </v-layout>

          <v-card flat color="green lighten-4">
            <v-card-title primary-title>
              {{ $t("day") }} {{ date }}
            </v-card-title>
            <v-list-item>
              <v-list-item-title>{{ $t("profit") }}</v-list-item-title>
              <v-list-item-title class="display-1 text-right green--text">
                <b>3,444</b>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>{{ $t("sell") }}</v-list-item-title>
              <v-list-item-title class="text-right title"
                >1,000</v-list-item-title
              >
            </v-list-item>
            <v-list-item>
              <v-list-item-title>{{ $t("cost") }}</v-list-item-title>
              <v-list-item-title class="title text-right red--text"
                >100</v-list-item-title
              >
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12" md="8">
          <v-data-table
            :headers="headers"
            :items="items"
            hide-default-footer
            :server-items-length="limit"
          >
          </v-data-table>
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
      date: new Date().toISOString().substring(0, 10),
      items: [],
      headers: [
        { text: this.$t("id"), value: "id" },
        { text: this.$t("id"), value: "sell_date" },
        { text: this.$t("customer"), value: "first" },
      ],
      limit: 10,
    };
  },
};
</script>

<style></style>
