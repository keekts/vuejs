export const state = () => ({
  books: [],
  total: 0,
});

export const mutations = {
  setBook(state, books) {
    state.books = books;
  },
  setTotal(state, total) {
    state.total = total;
  },
};

export const actions = {
  async getBook({ commit, state }, param = {}) {
    try {
      let rs = await this.$axios.get("book", {
        params: {
          limit: 10,
          ...param,
        },
      });
      commit("setTotal", rs.data.total);
      commit(
        "setBook",
        rs.data.results.map((e) => {
          e["checked"] = false;
          return e;
        })
      );
    } catch (error) {}
  },
};
