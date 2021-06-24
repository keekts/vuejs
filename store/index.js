export const state = () => ({
  search: ''
})

export const mutations = {
  search(state, search) {
   state.search = search
  },
}