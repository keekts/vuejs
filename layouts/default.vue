<template>
  <v-app dark>
    <v-main>
      <v-app-bar color="blue" dense dark height="70" fixed>
        <v-container grid-list-xs>
          <v-layout row wrap justify-center align-center align-content-center>
            <nuxt-link to="/">
              <img
                height="50"
                class="Logo"
                alt=" Logo"
                src="@/static/icon.png"
              />
            </nuxt-link>
            <div class="ml-3" style="width:100%;max-width: 400px">
              <v-text-field
                :placeholder="$t('search')"
                dense
                filled
                flat
                solo-inverted
                append-icon="mdi-magnify"
                hide-details
              ></v-text-field>
            </div>
            <v-spacer></v-spacer>

            <span v-if="$auth.loggedIn">
              <v-btn to="/dashboard" icon :title="$t('dashboard')">
                <v-icon>mdi-monitor-dashboard</v-icon>
              </v-btn>
              <v-btn @click="$auth.logout()" text>{{ $t("logout") }}</v-btn>
            </span>
            <span v-else>
              <v-btn to="/sign-up" text>ລົງທະບຽນ</v-btn>
              <v-btn to="/sign-in" text>ເຂົ້າ​ສູ່​ລະ​ບົບ</v-btn>
            </span>

            <v-badge overlap color="red">
              <template v-slot:badge>
                <span>{{ $store.state.cart.carts.length }}</span>
              </template>
              <v-btn to="/cart" icon>
                <v-icon>mdi-cart-outline</v-icon>
              </v-btn>
            </v-badge>
          </v-layout>
        </v-container>
      </v-app-bar>

      <div class="mt-16 pt-4">
        <nuxt />
      </div>
    </v-main>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2021</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
};
</script>
