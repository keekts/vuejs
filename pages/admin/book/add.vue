<template>
  <div>
    <v-container grid-list-xs>
      <h3>
        <v-btn @click="$router.push('/admin/book')" icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        Add new Book
      </h3>
      <v-row>
        <v-col md="6">
          <v-text-field label="name"></v-text-field>
          <vue-editor
            v-model="frm.description"
            placeholder="Description"
          ></vue-editor>

          <v-row>
            <v-col>
              <v-text-field label="price"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="price"></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col md="6">
          <book-type></book-type>
          <v-file-input
            show-size
            truncate-length="28"
            label="Image"
            @change="previewImage"
            accept="image/*"
          ></v-file-input>
          <v-layout justify-center wrap>
            <v-img :src="imageData" v-if="imageData" max-width="200"></v-img>
          </v-layout>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn>Cancel</v-btn>
          <v-btn color="primary"> save </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import BookType from "~/components/book/bookTypeDropdown";
export default {
  components: {
    VueEditor,
    BookType
  },
  data() {
    return {
      frm: {
        description: ""
      },
      file: null,
      imageData: "" // we will store base64 format of image in this string
    };
  },
  methods: {
    previewImage: function(event) {
      try {
        this.file = event;
        this.imageData = URL.createObjectURL(event);
      } catch (error) {
        this.$toast.error(`${error}`);
      }
    }
  }
};
</script>

<style></style>
