<template>
  <div>
    <v-container grid-list-xs fluid>
      <v-layout wrap>
        <v-spacer></v-spacer>
        <v-btn @click="$auth.logout()" outlined color="red" class="mt-4">
          {{ $t("logout") }}
        </v-btn>
      </v-layout>

      <v-sheet max-width="350" class="mx-auto" v-if="user">
        <h4 class="text-center">{{ $t("profile") }}</h4>
        <div class="text-center ma-4">
          <v-avatar size="150" color="red">
            <img :src="path + user.photo" :alt="user.first" />
          </v-avatar>
          <div>
            <input
              type="file"
              @change="changeCover($event)"
              accept="image/*"
              id="image"
              style="font-size:10px; max-width 100px"
              placeholder="Change profile"
            />
          </div>
          <v-divider class="mt-2"></v-divider>
          <div class="my-2">
            {{ $t("status") }}
            <v-chip :color="user.auther ? 'primary' : ''">{{
              user.auther
            }}</v-chip>
          </div>
        </div>

        <v-row>
          <v-col>
            <h5>{{ $t("gender") }}</h5>
            <v-chip-group v-model="user.gender" active-class="primary" column>
              <v-chip value="F">
                <v-icon>mdi-human-female</v-icon> {{ $t("f") }}
              </v-chip>
              <v-chip value="M">
                <v-icon>mdi-human-male</v-icon> {{ $t("m") }}
              </v-chip>
            </v-chip-group>
          </v-col>
          <v-col>
            <v-text-field
              :label="$t('age')"
              v-model="user.age"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              :label="$t('name')"
              v-model="user.first"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              :label="$t('last')"
              v-model="user.last"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-text-field :label="$t('phone')" v-model="user.phone"></v-text-field>
        <v-text-field
          :label="$t('username')"
          readonly
          disabled
          v-model="user.username"
        ></v-text-field>
        <v-text-field :label="$t('email')" v-model="user.email"></v-text-field>
        <v-btn @click.prevent="updateProfile()" color="primary">{{
          $t("save")
        }}</v-btn>
      </v-sheet>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      user: null,
      path: process.env.BASE_URL,
    };
  },
  mounted() {
    this.gettProfile();
  },
  methods: {
    async gettProfile() {
      try {
        let rs = await this.$axios.get("user", {
          params: { id: this.$auth.user.id },
        });
        this.user = rs.data.user;
      } catch (error) {}
    },
    async updateProfile() {
      try {
        let rs = await this.$axios.put("user", {
          input: {
            first: this.user.first,
            last: this.user.last,
            age: this.user.age,
            gender: this.user.gender,
            phone: this.user.phone,
            email: this.user.email,
          },
          id: this.$auth.user.id,
        });
        this.$toast.success(this.$t("saved"));
      } catch (error) {
        console.log(error);
        this.$toast.error(this.$t("fail"));
      }
    },
    async changeCover(event) {
      try {
        this.file = event;
        let data = new FormData();
        data.append("id", this.$auth.user.id);
        if (this.file.target.files[0]) {
          data.append("file", this.file.target.files[0]);
          let rs = await this.$axios.post("user/profile", data);
          this.$toast.success(this.$t("saved"));
          this.gettProfile();
        }
      } catch (error) {
        this.$toast.error(this.$t("fail"));
      }
    },
  },
};
</script>

<style></style>
