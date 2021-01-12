<template>
  <div>
    <v-container grid-list-xs>
      <h3>
        <v-btn @click="$router.push('/admin/book')" icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        Add new Book
      </h3>
      <v-row>
        <v-col md="3">
          <v-text-field label="name"></v-text-field>
        </v-col>
        <v-col md="3">
          <v-select :items="[]" label="Type"></v-select>
        </v-col>
        <v-col></v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field label="price"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field label="price"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn>Cancel</v-btn>
          <v-btn color="primary"> save </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>