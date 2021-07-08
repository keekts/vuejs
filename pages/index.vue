<template>
  <div>
    <v-container grid-list-xs>
      <v-row>
        <template v-for="(item, index) in books">
          <v-col md="2" sm="6">
            <v-card outlined min-height="330">
              <v-img :src="path + item.cover" height="200"></v-img>

              <div>
                <v-card-subtitle v-text="item.name"></v-card-subtitle>
                <!-- <v-card-subtitle v-html="item.description"></v-card-subtitle> -->
                <!-- <v-card-text>
                  <div>
                    <i> <s>1,500.00 LAK</s></i>
                  </div>
                </v-card-text> -->
                <v-card-actions>
                  <!-- <v-rating
                    color="yellow darken-3"
                    background-color="grey darken-1"
                    :value="5"
                    readonly
                    medium
                  ></v-rating> -->
                  <b class="subtitle"> {{ formatNumber(item.price) }} LAK </b>
                  <v-spacer></v-spacer>
                  <v-btn @click="addCart(item)" v-if="!item.checked" icon>
                    <v-icon>mdi-cart-plus</v-icon>
                  </v-btn>
                  <v-btn @click="removeCart(item.id)" v-else icon color="red">
                    <v-icon>mdi-cart-remove</v-icon>
                  </v-btn>
                </v-card-actions>
              </div>
            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: process.env.BASE_URL,
    };
  },
  mounted() {
    if (this.$store.state.book.books.length == 0) {
      this.$store.dispatch("book/getBook");
    }
  },
  methods: {
    formatNumber(n) {
      return Number(n).toLocaleString();
    },
    addCart(book) {
      try {
        this.$store.commit("cart/addCart", book);
        this.$toast.success(this.$t("success"), { position: "bottom-right" });
      } catch (error) {
        console.log(error);
      }
    },
    removeCart(bookID) {
      try {
        this.$store.commit("cart/removeCart", bookID);
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    books() {
      return this.$store.state.book.books;
    },
  },
};
</script>

<style></style>
