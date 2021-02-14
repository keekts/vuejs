<template>
  <v-card v-bind="$attrs" v-on="$listeners">
    <slot>
      <v-list-item>
        <v-list-item-avatar :color="avatarColor" size="70">
          <v-icon dark size="36">{{ icon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="display-1">{{ title }}</v-list-item-title>
          <v-list-item-subtitle>{{ desc }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </slot>
  </v-card>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    title: { type: String, default: "Untitle" },
    desc: { type: String, default: "Untitle" },
    icon: { type: String, default: "mdi-file" },
    avatarColor: { type: String, default: "green" }
  }
};
</script>

<style></style>
