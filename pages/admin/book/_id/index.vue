<template>
  <div>
  
    <v-container grid-list-xs>
      <v-row>
        <v-col md="2">
          <v-img
            src="https://m.media-amazon.com/images/I/41x7d5KZiOL.jpg"
          ></v-img>
        </v-col>
        <v-col md="8">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="title">
                The Body: A Guide for Occupants
              </v-list-item-title>
              <v-list-item-subtitle
                >by Bill Bryson (Author) Format: Kindle
                Edition</v-list-item-subtitle
              >
              <v-list-item-subtitle>LAK 100</v-list-item-subtitle>
              <v-divider class="my-2"></v-divider>
              <div>
                <v-btn :to="`/admin/book/${$route.params.id}/edit`" color="success" text>
                  <v-icon>mdi-pencil</v-icon> &nbsp; Edit
                </v-btn>
                <v-btn color="error" text>
                  <v-icon>mdi-delete</v-icon> delete
                </v-btn>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
