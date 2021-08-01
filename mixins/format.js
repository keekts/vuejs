export default {
  methods: {
    formatDate(date) {
      const d = new Date(date);
      return d
        .toISOString()
        .substring(0, 10)
        .split("-")
        .reverse()
        .join("/");
    },
    formatDatetime(datetime) {
      const d = new Date(date);
      return (
        d
          .toISOString()
          .substring(0, 10)
          .split("-")
          .reverse()
          .join("/") +
        " " +
        d.toLocaleTimeString()
      );
    },
    formatNumber(number, currency = "LAK") {
      return Number(`${number}`).toLocaleString() + " " + currency;
    },
  },
};
