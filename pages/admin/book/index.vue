<template>
  <div>
    <v-container grid-list-xs>
      <v-tabs>
        <v-tab to="/admin/book">Book</v-tab>
        <v-tab to="/admin/book/book-type">Book Type</v-tab>
      </v-tabs>
      <v-progress-linear :indeterminate="true"></v-progress-linear>
      <v-layout row wrap>
        <template v-for="(item, index) in 8">
          <v-flex  :key="index" sm12 md6>
            <v-list-item :to="`/admin/book/${item}`" three-line>
              <v-list-item-avatar tile width="100" height="130">
                <v-img
                  src="https://m.media-amazon.com/images/I/41x7d5KZiOL.jpg"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="title">
                  The Body: A Guide for Occupants
                </v-list-item-title>
                <v-list-item-subtitle
                  >by Bill Bryson (Author) Format: Kindle
                  Edition</v-list-item-subtitle
                >
                <v-list-item-subtitle>LAK 100</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn color="success" icon title="edit">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-flex>
        </template>
      </v-layout>
      <v-row>
        <v-col>
          <v-list> </v-list>
          <v-pagination
            :length="10"
            total-visible="7"
            v-model="page"
          ></v-pagination>
        </v-col>
      </v-row>
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
      page: 1,
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
  computed: {},
};
</script>

<style>
</style>