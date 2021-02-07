<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col md="6" cols="12">
        <h1 class="mb-4">ເຂົ້າ​ສູ່​ລະ​ບົບ</h1>
        <v-text-field
          label="ອີເມວ"
          append-icon="mdi-account-circle-outline"
          rounded
          filled
        ></v-text-field>
        <v-text-field
          label="ລະຫັດຜ່ານ"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="!showPass ? 'password' : 'text'"
          @click:append="showPass = !showPass"
          rounded
          filled
        ></v-text-field>
        <v-btn color="primary" height="60" rounded large block>ເຂົ້າ​ສູ່​ລະ​ບົບ</v-btn>
      </v-col>
      <v-col md="6" cols="12"s>
        <v-layout justify-center align-content-center fill-height wrap>
          <div style="width:100%" class="text-center">
            <h1 class="my-6">ລົງທະບຽນ</h1>
            <div style="max-width:300px;margin:0 auto">
              <v-btn
                color="primary lighten-2"
                rounded
                large
                elevation="0"
                block
                to="/sign-up" height="60"
              >
                ລົງທະບຽນ
              </v-btn>
            </div>
          </div>
        </v-layout>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showPass: false,
      frm: {
        email: "",
        password: ""
      }
    };
  }
};
</script>

<style></style>
