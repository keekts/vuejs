<template>
  <v-dialog
    v-model="dialog"
    v-bind="$attrs"
    v-on="$listeners"
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title primary-title>
        {{ title }}
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <slot> </slot>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel" color="error" text>{{ cancelText }}</v-btn>
        <v-btn @click="ok" color="primary" depressed>{{ okText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: Boolean,
    title: { type: String, default: "Confirm" },
    cancelText: { type: String, default: "cancel" },
    okText: { type: String, default: "ok" }
  },
  methods: {
    ok() {
      this.dialog = false;
      this.$emit("ok");
    },
    cancel() {
      this.dialog = false;
      this.$emit("cancel");
    }
  },
  computed: {
    dialog: {
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
