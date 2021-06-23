<template>
  <div>
    <v-container grid-list-xs>
      <v-row v-if="book">
        <v-col md="2">
          <v-img :src="path + book.cover" v-if="book.cover"></v-img>
          <div v-else>{{$t('no_image')}}</div>
          <div class="text-center">
            <label>
              <v-icon for="file" color="success" class="my-2">
                mdi-camera
              </v-icon> 
              {{$t('change')}}
              <input
                id="file"
                type="file"
                accept="image/*"
                @change="changeCover($event)"
                style="display:none"
              />
            </label>
          </div>
        </v-col>
        <v-col md="8">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="title">
                {{ book.name }}
              </v-list-item-title>
              <v-list-item-subtitle
                v-html="book.description"
              ></v-list-item-subtitle>
              <v-list-item-subtitle>LAK {{ toForrmat(book.price) }} {{$t('sell')}}</v-list-item-subtitle>
              <v-list-item-subtitle>LAK {{ toForrmat(book.price_cost) }} {{$t('buy')}}</v-list-item-subtitle>
              <div class="py-4">
                <v-chip-group
                  active-class="primary--text"
                  column
                  v-model="book.type_id"
                >
                  <template v-for="tag in bookType">
                    <v-chip :key="tag.id" :value="tag.id" small filter>
                      {{ tag.type_name }}
                    </v-chip>
                  </template>
                </v-chip-group>
              </div>
              <v-divider class="my-2"></v-divider>
              <div>
                <v-btn
                  :to="`/admin/book/${$route.params.id}/edit`"
                  color="success"
                  text
                >
                  <v-icon>mdi-pencil</v-icon> &nbsp; {{ $t("edit") }}
                </v-btn>
                <v-btn color="error" text>
                  <v-icon>mdi-delete</v-icon> {{ $t("delete") }}
                </v-btn>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      book: null,
      bookType: [],
      path: process.env.BASE_URL,
    };
  },
  mounted() {
    this.getId();
  },
  methods: {
    toForrmat(n){
      return Number(n).toLocaleString()
    },
    async getId() {
      try {
        let rs = await this.$axios.get("book", {
          params: { id: this.$route.params.id },
        });
        this.book = rs.data.book;
        this.bookType = rs.data.book_types;
      } catch (error) {}
    },
    async changeCover(event) {
      try {
        this.file = event;
        let data = new FormData();
        data.append("id", this.book.id);
        if (this.file.target.files[0]) {
          data.append("file", this.file.target.files[0]);
          let rs = await this.$axios.post("book/changeImage", data);
          this.$toast.success(this.$t("saved"));
          this.getId();
        }
      } catch (error) {
        this.$toast.error(`${error}`);
      }
    },
  },
};
</script>

<style></style>
