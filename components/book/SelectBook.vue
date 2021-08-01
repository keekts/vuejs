<template>
  <v-dialog
    v-bind="$attrs"
    v-on="$listeners"
    v-model="dialog"
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title primary-title>
        {{ $t("select") }}
        <v-spacer></v-spacer>
        <v-text-field
          :label="$t('search')"
          v-model="search"
          @keyup="getData()"
          prepend-inner-icon="mdi-magnify"
          dense
        ></v-text-field>
      </v-card-title>
      <template v-for="(item, index) in items">
        <v-list-item @click="select(item)" :key="index">
          <v-list-item-avatar size="48">
            <v-avatar color="grey lighten-1">
              <img :src="path + item.cover" alt="alt" v-if="item.cover"/>
              <v-icon v-else>mdi-book</v-icon>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ formatNumber(item.price) }} </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
import format from '~/mixins/format'
export default {
  inheritAttrs: false,
  props: {
    value: Boolean,
  },
  mixins:[format],
  data() {
    return {
      path: process.env.BASE_URL,
      search: "",
      items: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    select(item) {
      this.$emit("select", item);
      this.dialog = false;
    },
    async getData() {
      try {
        let rs = await this.$axios.get("book", {
          params: {
            limit: 10,
            search: this.search,
          },
        });
        this.items = rs.data.results;
      } catch (error) {}
    },
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      },
    },
  },
};
</script>

<style></style>
