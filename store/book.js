export const state = () => ({
  books: [],
});

export const mutations = {
  setBook(state, books) {
    state.books = books;
  },
};

export const actions = {
  async getBook({ commit, state }) {
    try {
      let rs = await this.$axios.get("book", {
        params: {
          limit: 10,
        },
      });
      commit("setBook", rs.data.results);
    } catch (error) {}
  },
};
