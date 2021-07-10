<template>
<div>
  <v-container grid-list-xs fluid>
    <h4 class="mb-4">{{$t('supplier')}}</h4>
    <v-row>
      <v-col>
        <v-data-table :headers="headers" :items="suppliers" class="elevation-1">

          <template v-slot:item.option="{item}">
            <div>
              <v-btn @click="openEdit(item)" color="success" icon>
                <v-icon>mdi-pen</v-icon>
              </v-btn>
              <v-btn @click=" openDel(item)" color="error" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
  <v-btn @click="add=true" color="primary" absolute bottom right fab>
    <v-icon>mdi-plus</v-icon>
  </v-btn>

  <AddSupplier v-model="add" @data="addSupp" />
  <EditSupplier v-model="edit" :supplier="supplier" @data="updateEdit" />

  <confirm-box title="delete" v-model="dialogDel" okText="delete" @ok="deleteAction">
    <v-card-text v-if="supplier" class="mt-3">
      <h3>{{ supplier.name }}</h3>
      <p>{{ supplier.address }}</p>
    </v-card-text>
  </confirm-box>

</div>
</template>

<script>
import AddSupplier from '~/components/supplier/AddSupplier'
import EditSupplier from '~/components/supplier/EditSupplier'
import ConfirmBox from "~/components/ConfirmBox";

export default {
  layout: 'admin',
  components: {
    AddSupplier,
    EditSupplier,
    ConfirmBox
  },
  data() {
    return {
      dialogDel: false,
      add: false,
      edit: false,
      supplier: null,
      suppliers: [],
      headers: [{
          text: this.$t('name'),
          value: 'name'
        },
        {
          text: this.$t('phone'),
          value: 'phone'
        },
        {
          text: this.$t('email'),
          value: 'email'
        },
        {
          text: this.$t('address'),
          value: 'address'
        },
        {
          text: this.$t('option'),
          value: 'option'
        }
      ]
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    formatDate(d) {
      return new Date(d).toLocaleDateString()
    },
    addSupp(data) {
      try {
        if (this.suppliers.length > 0) {
          this.suppliers.unshift(data)
        } else {
          this.suppliers.push(data)
        }

      } catch (error) {
        this.$toast.error(this.$t('fail') + `${error}`)
      }
    },
    openEdit(item) {
      try {
        this.supplier = item
        this.edit = true
      } catch (error) {
        this.$toast.error(this.$t('fail') + `${error}`)
      }
    },
    updateEdit(item) {
      this.getData()
    },
    async getData() {
      try {
        let rs = await this.$axios.get('supplier', {
          params: {
            search: this.$store.state.search
          }
        })
        this.suppliers = rs.data.suppliers
      } catch (error) {
        this.$toast.error(this.$t('fail'))
      }
    },
    openDel(item) {
      this.supplier = item;
      this.dialogDel = true;
    },
    async deleteAction() {
      try {
        let index = this.suppliers.indexOf(this.supplier)
        this.suppliers.splice(index, 1)
        let rs = await this.$axios.delete(`supplier/index/${this.supplier.id}`);
        this.$toast.success(this.$t('success'))
      } catch (error) {
        this.$toast.error(this.$t('cannot_delete'))
      }
    }
  },
  computed: {
    search() {
      return this.$store.state.search
    }
  },
  watch: {
    search(v) {
      this.getData()
    }
  },
}
</script>

<style>

</style>
