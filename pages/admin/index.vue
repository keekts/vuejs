<template>
  <div>
    <v-container grid-list-xs>
      <v-row>
        <v-col>
          <card-box title="10K" desc="Order"></card-box>
        </v-col>
        <v-col>
          <card-box title="1K" desc="Book" icon="mdi-book" avatarColor="primary" to="/admin/book"></card-box>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CardBox from "~/components/CardBox";
export default {
  layout: "admin",
  components: {
    CardBox
  }
};
</script>

<style></style>
