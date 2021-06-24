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
      <v-card-title primary-title >
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
            <v-avatar  color="grey lighten-1">
             {{`${item.name[0]}`}}
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.phone }}</v-list-item-subtitle>
            <!-- <v-list-item-subtitle>{{ item.address }}</v-list-item-subtitle> -->
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: Boolean,
  },
  data() {
    return {
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
        let rs = await this.$axios.get("supplier", {
          params: {
            limit: 5,
            search: this.search,
          },
        });
        this.items = rs.data.suppliers;
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
