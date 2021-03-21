<template>
  <div>
    <v-container grid-list-xs>
      <v-row>
        <template v-for="item in 4">
          <v-col md="3" sm="6">
            <v-card outlined>
              <v-img
                src="https://storage.naiin.com/system/application/bookstore/resource/product/202009/511395/1000235330_front_XXL.jpg?imgname=%E0%B8%84%E0%B8%B4%E0%B8%94%E0%B8%95%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%99%E0%B9%81%E0%B8%9B%E0%B8%A5%E0%B8%87"
              ></v-img>

              <div>
                <v-card-title
                  class="headline"
                  v-text="'Growing up is happiness'"
                ></v-card-title>

                <v-card-subtitle v-text="'item.artist'"></v-card-subtitle>
                <v-card-text>
                  {{(Math.random() * 1000).toFixed(2)}} LAK
                  <div>
                   <i> <s>1,500.00 LAK</s></i>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-rating
                    color="yellow darken-3"
                    background-color="grey darken-1"
                    :value="5" readonly
                    medium
                  ></v-rating>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-cart-plus</v-icon>
                  </v-btn>
                </v-card-actions>
              </div>
            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>