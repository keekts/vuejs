export const state = () => ({
  carts: [],
});

export const mutations = {
  removeAll(state) {
    state.carts = []
  },
  addCart(state, book) {
    let check = state.carts.some((e) => e.id == book.id); // check book
    if (!check) {
      book["qty"] = 1;
      book["checked"] = true;
      state.carts.push(book);
    }
  },
  removeCart(state, bookID) {
    let carts = state.carts.filter((e) => Number(e.id) !== Number(bookID));
    let b = this.state.book.books.find((e) => e.id == bookID);
    if (b) {
      b.checked = false;
    }
    state.carts = carts;
  },
  increment(state, bookID) {
    let index = state.carts.findIndex((e) => e.id == bookID);
    state.carts[index]["qty"] = state.carts[index]["qty"] + 1;
  },
  decrement(state, bookID) {
    let index = state.carts.findIndex((e) => e.id == bookID);
    state.carts[index]["qty"] = state.carts[index]["qty"] - 1;
  },
};

export const actions = {};
