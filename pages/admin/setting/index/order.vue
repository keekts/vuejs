<template>
  <div>
    <v-btn color="primary" fab absolute bottom right>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-card class="mt-4">
      <v-data-table
        :headers="headers"
        :items="items"
        loading="true"
        hide-default-footer
      >
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      headers: [
        { text: "color", key: "status_name" },
        { text: "name", key: "status_name" },
        { text: "action", key: "action" },
      ],
    };
  },
};
</script>

<style>
</style>