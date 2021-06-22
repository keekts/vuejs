<template>
  <v-select
    v-bind="$attrs"
    v-on="$listeners"
    :items="items"
    v-model="bookType"
    :label="$t('book_type')"
    item-text="type_name"
    item-value="id"
  ></v-select>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ["value"],
  data() {
    return {
      items: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        let rs = await this.$axios.get("booktype");
        this.items = rs.data.booktypes;
      } catch (error) {
        this.$toast.error(`${error}`);
      }
    }
  },
  computed: {
    bookType: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      }
    }
  }
};
</script>

<style></style>
