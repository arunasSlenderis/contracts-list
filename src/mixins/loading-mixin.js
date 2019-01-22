export default {
  data() {
    return {
      loading: true,
      showPrimaryActionButton: false,
    };
  },

  watch: {
    loading(val) {
      if (!val) {
        setTimeout(() => {
          this.showPrimaryActionButton = true;
        }, 500);
      }
    }
  },

  beforeRouteLeave(to, from, next) {
    this.showPrimaryActionButton = false;
    setTimeout(() => {
      next();
    }, 100);
  }
};
