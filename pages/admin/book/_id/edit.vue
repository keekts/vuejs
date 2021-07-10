<template>
  <div>
    <v-container grid-list-xs fluid>
      <h3>
        <v-btn @click="$router.push('/admin/book')" icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        {{ $t("edit") }}
      </h3>
      <v-row v-if="frm">
        <v-col>
          <book-type v-model="frm.type_id"></book-type>
          <v-text-field v-model="frm.name" :label="$t('name')"></v-text-field>
          <vue-editor
            v-model="frm.description"
            :placeholder="$t('description')"
          ></vue-editor>

          <v-row>
            <v-col>
              <v-text-field
                v-model="frm.price"
                :label="$t('price')"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="frm.price_cost"
                :label="$t('price_cost')"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn @click="$router.back()" color="error" depressed>{{ $t("cancel") }}</v-btn>
          <v-btn @click.prevent="saveAction" depressed color="primary">
            {{ $t("save") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import BookType from "~/components/book/bookTypeDropdown";

export default {
  layout: "admin",
  components: {
    VueEditor,
    BookType,
  },
  data() {
    return {
      frm: null,
    };
  },
  mounted() {
    this.getId();
  },
  methods: {
    async getId() {
      try {
        let rs = await this.$axios.get("book", {
          params: { id: this.$route.params.id },
        });
        this.frm = rs.data.book;
      } catch (error) {
        this.$toast.error(`${error}`);
      }
    },
    async saveAction() {
      try {
        let rs = await this.$axios.put("book", { book: this.frm, id: this.$route.params.id });
        this.$toast.success(this.$t("saved"));
      } catch (error) {
        this.$toast.error(`${error}`);
      }
    },
  },
};
</script>

<style></style>
