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
      <!-- <v-skeleton-loader v-show="loading"
        type="article, actions"
      ></v-skeleton-loader> -->
      <v-data-table
        :headers="headers"
        :items="items"
        hide-default-footer
        :server-items-length="items.length"
        :loading="loading"
      >
        <template v-slot:item.action="{ item }">
          <div>
            <v-btn @click="openEdit(item)" color="success" icon>
              <v-icon>mdi-pen</v-icon>
            </v-btn>
            <v-btn @click="openDel(item)" color="red" icon>
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
        <v-card-title primary-title>
          Add
          <v-spacer></v-spacer>
          <v-btn @click="dialogAdd = false" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
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
          <v-btn
            @click.prevent="add()"
            :disabled="!frm.type_name.trim()"
            color="primary"
            text
            >ok</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogEdit"
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card v-if="current">
        <v-card-title primary-title>
          Edit
          <v-spacer></v-spacer>
          <v-btn @click="dialogEdit = false" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field label="Name" v-model="current.type_name"></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialogEdit = false" text>
            cancel
          </v-btn>
          <v-btn
            @click.prevent="updateAction()"
            :disabled="!current.type_name.trim()"
            color="primary"
            text
            >ok</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <confirm-box
      title="Delete Book type"
      v-model="dialogDel"
      okText="Delete"
      @ok="deleteAction"
    >
      <v-card-text v-if="current" class="mt-3">
        <h3>{{ current.type_name }}</h3>
      </v-card-text>
    </confirm-box>
  </div>
</template>

<script>
import ConfirmBox from "~/components/ConfirmBox";
export default {
  components: {
    ConfirmBox
  },
  data() {
    return {
      dialogAdd: false,
      dialogDel: false,
      dialogEdit: false,
      loading: false,
      items: [],
      headers: [
        { value: "id", text: "ID" },
        { value: "type_name", text: "Name Type" },
        { value: "action", text: "Action" }
      ],
      frm: {
        type_name: ""
      },
      current: null
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    openDel(item) {
      this.current = item;
      this.dialogDel = true;
    },
    openEdit(item) {
      this.current = item;
      this.dialogEdit = true;
    },
    async getData() {
      try {
        this.loading = true;
        let rs = await this.$axios.get("booktype");
        this.items = rs.data.booktypes;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$toast.error(`${error}`);
      }
    },
    async add() {
      try {
        if (!this.frm.type_name.trim()) {
          return;
        }
        let rs = await this.$axios.post("booktype", this.frm);
        this.items.push(rs.data.booktype);
        this.frm.type_name = "";
        this.dialogAdd = false;
        this.$toast.success(`saved`);
      } catch (error) {
        this.$toast.error(`${error}`);
      }
    },
    async updateAction() {
      try {
        let rs = await this.$axios.put("booktype", {
          ...this.current,
          id: this.current.id
        });
        this.dialogEdit = false;
        this.$toast.success(`saved`);
      } catch (error) {
        this.$toast.error(`${error}`);
      }
    },
    async deleteAction() {
      try {
        let rs = await this.$axios.delete(`booktype/index/${this.current.id}`);
        let index = this.items.indexOf(this.current);
        this.items.splice(index, 1);
        this.$toast.success(rs.data.message);
      } catch (error) {
        this.$toast.error(`${error}`);
      }
    }
  }
};
</script>

<style></style>
