<template>
  <div>
    <v-container grid-list-xs>
      <v-tabs>
        <v-tab to="/admin/book">{{ $t("book") }}</v-tab>
        <v-tab to="/admin/book/book-type">{{ $t("book_type") }}</v-tab>
      </v-tabs>
      <!-- <v-progress-linear :indeterminate="true"></v-progress-linear> -->
      <v-layout row wrap>
        <template v-for="(item, index) in books">
          <v-flex :key="index" sm12 md6>
            <v-list-item :to="`/admin/book/${item.id}`" three-line>
              <v-list-item-avatar tile width="100" height="130">
                <v-img
                  :src="path+item.cover"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="title">
                  {{ item.name }}
                </v-list-item-title>
                <v-list-item-subtitle
                  v-html="item.description"
                ></v-list-item-subtitle>
                <v-list-item-subtitle
                  >LAK {{ item.price }}</v-list-item-subtitle
                >
              </v-list-item-content>
              <!-- <v-list-item-action>
                <v-btn color="success" icon title="edit">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-list-item-action> -->
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
  layout: "admin",
  data() {
    return {
      page: 1,
      books: [],
      path:process.env.BASE_URL,
      headers: [
        { text: "id", value: "id" },
        { text: "name", value: "name" },
      ],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        let rs = await this.$axios.get("book");
        this.books = rs.data.results;
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {},
};
</script>

<style></style>
