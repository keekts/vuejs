<template>
  <div>
    <v-btn @click="dialogAdd = true" color="primary" fab fixed bottom right>
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-container grid-list-xs fluid>
      <v-layout wrap>
        <h3>
          <v-btn @click="$router.back()" icon>
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          {{ $t("ວິຊາ") }}
        </h3>
      </v-layout>
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
          {{ $t("add") }}
          <v-spacer></v-spacer>
          <v-btn @click="dialogAdd = false" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-5">
          <v-text-field
            name="name"
            v-model="frm.sub_name"
            :label="$t('ຊື່ວິຊາ')"
            id="id"
            @keyup.enter="add"
            solo
            rounded
            dense
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialogAdd = false" depressed color="error">
            {{ $t("cancel") }}
          </v-btn>
          <v-btn
            @click.prevent="add()"
            :disabled="!frm.sub_name.trim()"
            depressed
            color="primary"
          >
            {{ $t("ok") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <confirm-box
      title="delete"
      v-model="dialogDel"
      okText="delete"
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
  layout: "admin",

  components: {
    ConfirmBox,
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
        {
          value: "sub_name",
          text: this.$t("ຊື່ວິຊາ"),
        },
        {
          value: "action",
          text: this.$t("option"),
        },
      ],
      frm: {
        sub_name: "",
      },
      current: null,
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
        let rs = await this.$axios.get("subject");
        this.items = rs.data.subjects;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$toast.error(`${error}`);
      }
    },

    async add() {
      try {
        if (!this.frm.sub_name.trim()) {
          return;
        }
        let rs = await this.$axios.post("subject", this.frm);
        this.items.push(rs.data.subject);
        this.frm.sub_name = "";
        this.dialogAdd = false;
        this.$toast.success(this.$t("saved"));
      } catch (error) {
        this.$toast.error(`${error}`);
      }
    },

    async updateAction() {
      try {
        let rs = await this.$axios.put("subject", {
          ...this.current,
          id: this.current.id,
        });
        this.dialogEdit = false;
        this.$toast.success(this.$t("saved"));
      } catch (error) {
        this.$toast.error(`${error}`);
      }
    },
    async deleteAction() {
      try {
        let rs = await this.$axios.delete(`subject/index/${this.current.id}`);
        let index = this.items.indexOf(this.current);
        this.items.splice(index, 1);
        this.$toast.success(rs.data.message);
      } catch (error) {
        this.$toast.error(this.$t("cannot_delete"));
      }
    },
  },
};
</script>

<style>
</style>