<template>
  <div>
      <v-container grid-list-xs>
          <h2>Setting</h2>
          <v-tabs>
              <v-tab to="/admin/setting/">Genneral</v-tab>
              <v-tab to="/admin/setting/order">Order</v-tab>
              <v-tab to="/admin/setting/book-type">Book type</v-tab>
          </v-tabs>
          <nuxt-child />
      </v-container>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>