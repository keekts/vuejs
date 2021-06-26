<template>
  <div>
    <v-container grid-list-xs>
      <v-row>
        <v-col>
          <CardDashboard
            title="Order"
            fileCount="13 "
            fileSize=""
            color="grey lighten-4"
            flat
          />
        </v-col>

         <v-col>
          <CardDashboard
            title="Books"
            fileCount="13 "
            fileSize=""
            color="grey lighten-4"
            flat
            iconColor="amber"
            titleClass="amber--text"
            icon="mdi-book"
            to="admin/book"
          ></CardDashboard>
        </v-col>

        <v-col>
          <card-box title="10K" desc="Order" flat color="grey lighten-4"></card-box>
        </v-col>
        <v-col>
          <card-box
            title="1K"
            desc="Book"
            icon="mdi-book"
            avatarColor="primary"
            to="/admin/book"
          ></card-box>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CardBox from "~/components/CardBox";
import CardDashboard from "~/components/CardDashboard";
export default {
  layout: "admin",
  components: {
    CardBox,
    CardDashboard,
  },
  mounted() {
    this.$router.push('/dashboard')
  },
};
</script>

<style></style>
