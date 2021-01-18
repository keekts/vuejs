<template>
  <div>
    <v-btn @click="dialogAdd = true" color="primary" fab absolute bottom right>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-container grid-list-xs>
      <v-layout wrap>
        <h3>
          <v-btn @click="$router.back()" icon>
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          Book type
        </h3>
      </v-layout>
      <v-data-table
        :headers="headers"
        :items="items"
        hide-default-footer
        :server-items-length="items.length"
      >
        <template v-slot:item.action="{ data }">
          <div>
            <v-btn color="success" icon>
              <v-icon>mdi-pen</v-icon>
            </v-btn>
            <v-btn color="red" icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-container>

    <v-dialog
      v-model="dialogAdd"
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title> Add </v-card-title>
        <v-card-text>
          <v-text-field
            name="name"
            v-model="frm.type_name"
            label="Type name"
            id="id"
            @keyup.enter="add"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialogAdd = false" text>Cancel</v-btn>
          <v-btn @click="add" color="primary" text>ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogAdd: false,
      items: [],
      headers: [
        { value: "id", text: "ID" },
        { value: "type_name", text: "Name Type" },
        { value: "action", text: "Action" },
      ],
      frm: {
        type_name: "",
      },
    };
  },
  methods: {
    async add() {
      try {
        if (!this.frm.type_name.trim()) {
          return;
        }
        this.items.push({
          id: this.items.length + 1,
          type_name: this.frm.type_name,
        });
        this.frm.type_name = "";
        this.dialogAdd = false;
      } catch (error) {}
    },
  },
};
</script>

<style>
</style>