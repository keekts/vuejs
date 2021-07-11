export const state = () => ({
  search: "",
  fsearch: "",
});

export const mutations = {
  search(state, search) {
    state.search = search;
  },
  setFsearch(state, search) {
    state.fsearch = search;
  },
};
