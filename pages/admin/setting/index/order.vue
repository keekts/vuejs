<template>
  <div>
    <v-btn
      @click="dialogAdd = !dialogAdd"
      color="primary"
      fab
      absolute
      bottom
      right
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-card class="mt-4">
      <v-data-table
        :headers="headers"
        :items="items"
        loading="true"
        hide-default-footer
      >
      </v-data-table>
    </v-card>

    <v-dialog
      v-model="dialogAdd"
      scrollable
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>
          Add
          <v-spacer></v-spacer>
          <v-btn @click="dialogAdd = !dialogAdd" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Status"></v-text-field>
          <text-color></text-color>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialogAdd = !dialogAdd" text>cancel</v-btn>
          <v-btn text color="primary">ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import TextColor from '~/components/TextColor'
export default {
  components:{
    TextColor
  },
  data() {
    return {
      dialogAdd: false,
      dialogEdit: false,
      color:'#1976D2FF',
      items: [],
      headers: [
        { text: "color", key: "status_name" },
        { text: "name", key: "status_name" },
        { text: "action", key: "action" },
      ],
    };
  },
};
</script>

<style>
</style>