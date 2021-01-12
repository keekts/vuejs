<template>
  <div>
    <v-container grid-list-xs>
      <v-data-table
        :headers="headers"
        :items="books"
        class="elevation-1"
        loading="true"
        hide-default-footer
      >
      </v-data-table>
      <v-pagination :length="10" v-model="page" total-visible="7"></v-pagination>
    </v-container>
    <v-btn color="primary" fab absolute bottom right to="/admin/book/add">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page:1,
      books: [
        { id: 1, name: "B1" },
        { id: 2, name: "B1" },
        { id: 3, name: "B1" },
        { id: 4, name: "B1" },
        { id: 5, name: "B1" },
        { id: 6, name: "B1" },
        { id: 7, name: "B1" },
      ],
      headers: [
        { text: "id", value: "id" },
        { text: "name", value: "name" },
      ],
    };
  },
  computed: {
   
  },
};
</script>

<style>
</style>