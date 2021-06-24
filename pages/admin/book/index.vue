<template>
<div>
  <v-container grid-list-xs>
    <v-tabs>
      <v-tab to="/admin/book">{{ $t("book") }}</v-tab>
      <v-tab to="/admin/book/book-type">{{ $t("book_type") }}</v-tab>
    </v-tabs>
    <v-progress-linear :indeterminate="true" v-show="searching"></v-progress-linear>
    <v-layout row wrap>
      <template v-for="(item, index) in books">
        <v-flex :key="index" sm12 md6>
          <v-list-item :to="`/admin/book/${item.id}`" three-line>
            <v-list-item-avatar tile width="100" height="130">
              <v-img :src="path+item.cover" v-if="item.cover"></v-img>
              <v-icon v-else class="mdi-48px">mdi-book</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <h3> {{ item.name }}</h3>
              </v-list-item-title>
              <v-list-item-title>
                <h5>
                  <b>{{$t('qty')}} {{ toForrmat(item.qty || 0) }}</b>
                </h5>
              </v-list-item-title>
              <v-list-item-subtitle v-html="item.description"></v-list-item-subtitle>
              <v-list-item-subtitle class="primary--text"><b>LAK {{ toForrmat(item.price) }}</b> {{$t('sell')}}</v-list-item-subtitle>
              <v-list-item-subtitle class="red--text">LAK {{ toForrmat(item.price_cost) }} {{$t('buy')}}</v-list-item-subtitle>
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
        <v-pagination @input="getData" :length="pageTotal" total-visible="7" v-model="page"></v-pagination>
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
      limit: 10,
      total: 0,
      pageTotal: 0,
      searching:false,
      books: [],
      path: process.env.BASE_URL,
      headers: [{
          text: "id",
          value: "id"
        },
        {
          text: "name",
          value: "name"
        },
      ],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    toForrmat(n) {
      return Number(n).toLocaleString()
    },
    async getData() {
      try {
        this.searching = true
        let rs = await this.$axios.get("book", {
          params: {
            limit: this.limit,
            offset: (this.page - 1) * this.limit,
            search:this.search
          }
        });
        this.books = rs.data.results;
        this.pageTotal = Math.ceil(rs.data.total / this.limit)
        this.searching = false
      } catch (error) {
        this.$toast.error(this.$t('fail'))
        this.searching = false
      }
    },
  },
  computed: {
    search() {
      return this.$store.state.search
    }
  },
  watch: {
    search(v) {
      this.getData()
    }
  },
};
</script>

<style></style>
