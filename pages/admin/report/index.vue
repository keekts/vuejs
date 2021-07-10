<template>
  <div>
    <v-container grid-list-xs fluid>
      <h3 class="mb-4">{{$t('report')}}</h3>
      <v-row>
        <v-col>
          <card-box
            text
            :title="$t('report_book')"
            desc="" 
            icon="mdi-book"
            avatarColor="amber"
            to="/admin/book/report"
          ></card-box>
        </v-col>

        <v-col>
          <card-box
            text
            :title="$t('report_order')"
            desc=""
            icon="mdi-cart"
            avatarColor="primary"
            to="/admin/sell/order" 
          ></card-box>
        </v-col>

        <v-col>
          <card-box
            text
            :title="$t('report_daily')"
            desc=""
            icon="mdi-cart"
            avatarColor="primary"
            to="/admin/sell/daily"
          ></card-box>
        </v-col>

        <v-col>
          <card-box
            text
            :title="$t('report_sell')"
            desc=""
            icon="mdi-cart"
            avatarColor="primary"
            to="/admin/sell"
          ></card-box>
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
    CardBox,
  },
};
</script>

<style></style>
