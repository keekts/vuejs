<template>
<div>
  <v-container grid-list-xs>
    <v-row v-if="user">

      <v-col>
        <div>
          <label for="image">
            <v-avatar size="48" color="grey lighten-1">
              <img :src="path+user.photo" alt="alt" v-if="user.photo">
              <v-icon class="mdi-24px" v-else>mdi-camera</v-icon>
            </v-avatar>
          </label>
          <input type="file"  @change="changeCover($event)" accept="image/*" style="display:none" id="image">
        </div>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title v-text="$t('gender')"></v-list-item-title>
            <v-list-item-subtitle v-html="$t(user['gender'].toLowerCase()) || '-'"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <template v-for="(item, index) in cols">
          <v-list-item :key="index" dense>
            <v-list-item-content>
              <v-list-item-title v-text="$t(item)"></v-list-item-title>
              <v-list-item-subtitle v-html="user[item] || '-'"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-divider class="my-2"></v-divider>
        <div>
          <v-btn nuxt link :to="`/admin/emp/${user.id}/edit`" color="primary" outlined>
            <v-icon>mdi-pen</v-icon>
            {{$t('edit')}}
          </v-btn>
          <v-btn color="error" outlined>
            <v-icon>mdi-delete</v-icon>
            {{$t('delete')}}
          </v-btn>
        </div>

      </v-col>
    </v-row>
  </v-container>
  <v-btn color="primary" fab absolute bottom right to="/admin/emp/add">
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      user: null,
      path: process.env.BASE_URL,
      cols: [
        'first', 'last', 'address', 'phone', 'age', 'email', 'username', 'auther'
      ]
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async changeCover(event) {
      try {
        this.file = event;
        let data = new FormData();
        data.append("id", this.user.id);
        if (this.file.target.files[0]) {
          data.append("file", this.file.target.files[0]);
          let rs = await this.$axios.post("user/profile", data);
          this.$toast.success(this.$t("saved"));
          this.getData();
        }
      } catch (error) {
        this.$toast.error(this.$t('fail'));
      }
    },
    async getData() {
      try {
        let rs = await this.$axios.get('user', {
          params: {
            id: this.$route.params.id
          }
        })
        this.user = rs.data.user

      } catch (error) {

      }
    }
  },
}
</script>

<style>

</style>
