<template>
  <v-app dark>
    <v-navigation-drawer app permanent floating width="120">
      <v-layout column justify-center justify-space-between fill-height>
        <div>
          <v-list-item @click="$router.push('/dashboard')">
            <v-list-item-title class="text-center">
              <v-avatar size="48" class="mt-4" tile>
                <img src="@/static/icon.png" alt="alt" />
              </v-avatar>
            </v-list-item-title>
          </v-list-item>
        </div>

        <v-list nav>
          <template v-for="(item, index) in items">
            <v-list-item
              :to="`/${item.link}`"
              nuxt
              link
              :key="index"
              :title="item.title"
              justify-center
            >
              <v-list-item-content>
                <v-avatar size="36" width="64" class="text-center">
                  <v-icon>{{ item.icon }}</v-icon>
                </v-avatar>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>

        <div>
          <v-list-item to="/admin/emp/profile">
            <v-list-item-content class="text-center">
              <div>
                <v-avatar size="48" color="grey lighten-4">
                  <img src="@/static/icon.png" alt="alt" />
                </v-avatar>
                <p class="pa-2">
                  Daimon
                </p>
              </div>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-layout>
    </v-navigation-drawer>

    <v-app-bar flat app fixed color="white">
      <v-toolbar-title v-html="'<b>' + $t('dashboard') + '</b>'">
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" title="Fontend" text>
        <v-icon>mdi-home-outline</v-icon> &nbsp; {{ $t("font_end") }}
      </v-btn>
      <div>
        <v-text-field
          :placeholder="$t('search')"
          @keyup="$store.commit('search', $event.target.value)"
          filled
          small
          solo-inverted
          hide-details
          flat
          dense
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
      </div>

      <v-btn @click="$auth.logout()" color="error" icon>
        <v-icon>mdi-power</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>

    <v-footer fixed app>
      <span>&copy; 2021</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "admin",
  middleware: "authenticated",
  data() {
    return {
      items: [
        {
          link: "dashboard",
          icon: "mdi-apps",
          title: this.$t("dasboard"),
        },
        {
          link: "admin/book",
          icon: "mdi-book",
          title: this.$t("book"),
        },
        {
          link: "admin/report",
          icon: "mdi-equalizer-outline",
          title: this.$t("report"),
        },
        {
          link: "admin/setting",
          icon: "mdi-cog-outline",
          title: this.$t("setting"),
        },
      ],
    };
  },
};
</script>
