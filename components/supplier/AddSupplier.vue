<template>
<v-dialog v-model="dialog" persistent :overlay="false" max-width="500px" transition="dialog-transition">
  <v-card>
    <v-card-title primary-title>
      {{$t('add')}}
      <v-spacer></v-spacer>
      <v-btn @click="dialog=false" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
     <v-text-field :label="$t('name')" v-model="frm.name"></v-text-field>
      <v-text-field :label="$t('phone')" v-model="frm.phone"></v-text-field>
      <v-text-field :label="$t('email')" v-model="frm.email"></v-text-field>
      <v-textarea :label="$t('address')" rows="2" v-model="frm.address"></v-textarea>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="dialog=false" color="error" text>{{$t('cancel')}}</v-btn>
      <v-btn @click.prevent="saveAction" color="primary" text>{{$t('ok')}}</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean
  },
  data() {
    return {
      frm: {
        name: null,
        email: null,
        address: null,
        phone: null,
      }
    }
  },
  methods: {
    async saveAction() {
      try {
        let rs = await this.$axios.post('supplier', {
          input: this.frm
        })
        this.dialog = false
        this.$toast.success(this.$t('saved'))

        this.$emit('data', rs.data.supplier)

      } catch (error) {
        this.$toast.error(this.$t('fail'))
        this.dialog = false
      }
    }
  },
  computed: {
    dialog: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    }
  },
}
</script>

<style>

</style>
