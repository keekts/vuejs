<template>
  <div>
    <v-container grid-list-xs>
      <h3>
        <v-btn @click="$router.push('/admin/book')" icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        {{$t('add_book')}}
      </h3>
      <v-row>
        <v-col md="6">
          <v-text-field v-model="frm.name" :label="$t('name')"></v-text-field>
          <vue-editor
            v-model="frm.description"
            :placeholder="$t('description')"
          ></vue-editor>

          <v-row>
            <v-col>
              <v-text-field v-model="frm.price" :label="$t('price')"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="frm.price_cost" :label="$t('price_cost')"></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col md="6">
          <book-type v-model="frm.type_id"></book-type>
          <v-file-input
            show-size
            truncate-length="28"
            :label="$t('image')"
            @change="previewImage($event)"
            accept="image/*"
          ></v-file-input>
          <v-layout justify-center wrap>
            <v-img :src="imageData" v-if="imageData" max-width="200"></v-img>
          </v-layout>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn @click="$router.back()">{{$t('cancel')}}</v-btn>
          <v-btn @click.prevent="saveActive" color="primary"> {{$t('save')}} </v-btn>
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
        description: "",
        name: "",
        type_id: "",
        price: "",
        price_cost: ""
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
    },
    async saveActive() {
      try {
        let data = new FormData();
        data.append('name', this.frm.name);
        data.append('description', this.frm.description);
        data.append('type_id', this.frm.type_id);
        data.append('price', this.frm.price);
        data.append('price_cost', this.frm.price_cost);
        data.append('file', this.file);
        let rs = await this.$axios.post('book',data);
        this.$toast.success(this.$t('saved'));
      } catch (error) {
        this.$toast.error(`${error}`);
      }
    }
  }
};
</script>

<style></style>
