export default {
  methods: {
    addCart(book) {
      try {
        this.$store.commit("cart/addCart", book);
        this.$toast.success(this.$t("success"), { position: "bottom-right" });
      } catch (error) {
        console.log(error);
      }
    },
    removeCart(bookID) {
      try {
        this.$store.commit("cart/removeCart", bookID);
      } catch (error) {}
    },
  },
}