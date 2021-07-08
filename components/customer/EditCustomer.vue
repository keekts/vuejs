<template>
  <v-dialog
    v-model="dialog"
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title primary-title>
        {{ $t("edit") }}
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-text-field :label="$t('name')" v-model="frm.first"></v-text-field>
        <v-text-field :label="$t('last')" v-model="frm.last"></v-text-field>
        <v-text-field :label="$t('phone')" v-model="frm.phone"></v-text-field>
        <v-chip-group active-class="primary--text" column v-model="frm.status">
          <template v-for="tag in ['Approved', 'Pending', 'Blocked']">
            <v-chip :key="tag" :value="tag" small filter>
              {{ tag }}
            </v-chip>
          </template>
        </v-chip-group>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false" color="error" text>{{
          $t("cancel")
        }}</v-btn>
        <v-btn @click.prevent="saveAction" color="primary" text>{{
          $t("ok")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
    customer: Object,
  },
  data() {
    return {
      frm: {
        first: null,
        last: null,
        phone: null,
        status: null,
      },
    };
  },
  methods: {
    async saveAction() {
      try {
        let rs = await this.$axios.put("customer", {
          input: {
            first: this.frm.first,
            last: this.frm.last,
            phone: this.frm.phone,
            status: this.frm.status || "Approved",
          },
          id: this.frm.id,
        });
        this.dialog = false;
        this.$toast.success(this.$t("saved"));

        this.$emit("data", rs.data.customer);
      } catch (error) {
        this.$toast.error(this.$t("fail"));
        this.dialog = false;
      }
    },
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      },
    },
  },
  watch: {
    customer(v) {
      Object.assign(this.frm, v);
    },
  },
};
</script>

<style></style>
