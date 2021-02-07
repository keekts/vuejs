<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col md="6" cols="12">
        <h1 class="mb-4">ລົງທະບຽນ</h1>
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
        <v-text-field
          label="ຢືນ​ຢັນ​ລະ​ຫັດ"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="!showPass ? 'password' : 'text'"
          @click:append="showPass = !showPass"
          rounded
          filled
        ></v-text-field>
        <v-text-field
          label="ເບີຕິດຕໍ່"
          append-icon="mdi-cellphone"
          rounded
          filled
        ></v-text-field>
        <v-btn color="primary" height="60" rounded large block>ລົງທະບຽນ</v-btn>
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
