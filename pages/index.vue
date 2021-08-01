<template>
  <div>
    <v-container grid-list-xs>
      <v-row>
        <template v-for="(item, index) in books">
          <v-col md="3" sm="6">
            <v-card outlined min-height="330">
              <v-img
                @click="$router.push(`/book/${item.id}`)"
                :src="path + item.cover"
                height="200"
              ></v-img>

              <div>
                <v-card-subtitle>
                  <nuxt-link :to="`/book/${item.id}`" class="no-line">
                    {{ item.name }}
                  </nuxt-link>
                </v-card-subtitle>
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
                  <b class="subtitle"> {{ formatNumber(item.price) }} </b>
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
      <v-pagination
        :length="pageTotal"
        v-model="page"
        @input="getData()"
      ></v-pagination>
    </v-container>
  </div>
</template>

<script>
import cart from "~/mixins/cart";
import format from "~/mixins/format";
export default {
  mixins: [cart, format],
  data() {
    return {
      path: process.env.BASE_URL,
      page: 1,
      limit: 10,
    };
  },
  mounted() {
    if (this.$store.state.book.books.length == 0) {
      this.$store.dispatch("book/getBook");
    }
  },
  methods: {
    getData() {
      let val = {
        limit: this.limit,
        offset: (this.page - 1) * this.limit,
      };
      this.$store.dispatch("book/getBook", val);
    },
  },
  computed: {
    searchText() {
      return this.$store.state.fsearch;
    },
    books() {
      return this.$store.state.book.books;
    },
    pageTotal() {
      return Math.ceil(this.$store.state.book.total / this.limit);
    },
  },
  watch: {
    searchText(v) {
      this.$store.dispatch("book/getBook", { search: v });
    },
  },
};
</script>

<style>
.no-line {
  text-decoration: none;
}
</style>
