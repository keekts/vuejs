<template>
  <div>
    <v-container grid-list-xs>
      <v-skeleton-loader
        type="article,actions"
        height="300"
        v-if="loading"
      ></v-skeleton-loader>
      <v-row v-if="book">
        <v-col cols="12" md="2">
          <v-img :src="path + book.cover" v-if="book.cover"></v-img>
        </v-col>
        <v-col cols="12" md="8">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="title">
                {{ book.name }}
              </v-list-item-title>
              <v-list-item-subtitle
                v-html="book.description"
              ></v-list-item-subtitle>
              <v-list-item-subtitle>
                <b>LAK {{ toForrmat(book.price) }}</b>
              </v-list-item-subtitle>
              <div class="my-3">
                <v-btn
                  @click="removeCart(book.id)"
                  v-if="isCarted"
                  color="error"
                  outlined
                  rounded
                >
                  <v-icon>mdi-cart-remove</v-icon> &nbsp;
                  {{ $t("remove_cart") }}
                </v-btn>
                <v-btn
                  v-else
                  @click="addCart(book)"
                  color="success"
                  outlined
                  rounded
                >
                  <v-icon>mdi-cart-plus</v-icon> &nbsp; {{ $t("add_cart") }}
                </v-btn>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
      <v-divider class="my-4"></v-divider>
      <v-skeleton-loader
        type="article"
        height="300"
        v-if="loading"
      ></v-skeleton-loader>
      <v-row>
        <template v-for="(item, index) in books">
          <v-col md="3" :key="index">
            <v-list-item :to="`/book/${item.id}`" three-line class="pa-0">
              <v-list-item-avatar tile size="90">
                <v-img :src="path + item.cover" v-if="item.cover"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-title>
                  <b>{{ toForrmat(item.price) }} LAK</b>
                </v-list-item-title>
                <v-list-item-subtitle
                  v-html="item.description"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import cart from "~/mixins/cart";

export default {
  mixins: [cart],
  data() {
    return {
      loading: false,
      book: null,
      books: [],
      path: process.env.BASE_URL,
    };
  },
  mounted() {
    this.getBook();
  },
  methods: {
    toForrmat(n) {
      return Number(n).toLocaleString();
    },
    async getBook() {
      try {
        this.loading = true;
        let rs = await this.$axios.get("book/id", {
          params: { id: this.$route.params.id },
        });
        this.loading = false;
        this.book = rs.data.book;
        this.books = rs.data.books;
      } catch (error) {
        this.loading = false;
      }
    },
  },
  computed: {
    isCarted() {
      if (this.book) {
        let check = this.$store.state.cart.carts.some(
          (e) => e.id == this.book.id
        );
        return check;
      }
      return false;
    },
  },
};
</script>

<style></style>
