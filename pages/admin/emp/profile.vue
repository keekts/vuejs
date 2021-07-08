<template>
  <div>
    <v-container grid-list-xs>
      <v-layout wrap>
        <h4>{{ $t("profile") }}</h4>
        <v-spacer></v-spacer>
        <v-btn @click="$auth.logout()" outlined color="red" class="mt-4">
          {{ $t("logout") }}
        </v-btn>
      </v-layout>

      <v-row>
        <v-col>
          <v-text-field :label="$t('name')"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field :label="$t('last')"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field :label="$t('email')"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="primary">{{$t('save')}}</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "admin",
};
</script>

<style></style>
