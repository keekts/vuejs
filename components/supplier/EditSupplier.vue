<template>
<v-dialog v-model="dialog" persistent :overlay="false" max-width="500px" transition="dialog-transition">
  <v-card>
    <v-card-title primary-title>
      {{$t('edit')}}
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
      <v-btn @click.prevent="saveAction"  color="primary" text>{{$t('ok')}}</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
    supplier: Object
  },
  data() {
    return {
      frm: {
        first: null,
        last: null,
        phone: null,
      }
    }
  },
  methods: {
    async saveAction() {
      try {
        let rs = await this.$axios.put('supplier', {
          input: {
            name: this.frm.name,
            email: this.frm.email,
            address: this.frm.address,
            phone: this.frm.phone,
          },
          id: this.frm.id
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
  watch: {
    supplier(v) {
      Object.assign(this.frm, v)
    }
  },
}
</script>

<style>

</style>
