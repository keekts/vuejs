const roles = [
  {
    emp: {
      Admin: true,
      User: false,
    },
    reportDay: {
      Admin: true,
      User: true,
    },
    reportMonth: {
      Admin: true,
      User: false,
    },
    reportYear: {
      Admin: true,
      User: false,
    },
  },
];

export default {
  methods: {
    hasRole(role) {
      try {
        return roles.some((e) => e[role][this.$auth.user.auther] == true);
      } catch (error) {
        return false;
      }
    },
  },
};
