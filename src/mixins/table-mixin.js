export default {
  data() {
    return {
      showRowActions: []
    };
  },

  methods: {
    /**
     * Lazily loads row actions.
     * Call on row hover.
     * @param rowIndex
     */
    loadRowActions(rowIndex) {
      if (!this.showRowActions[rowIndex]) {
        this.$set(this.showRowActions, rowIndex, true);
      }
    },

    emitEvent(type, item, index) {
      this.$emit(type, {
        item,
        index
      });
    },

    /**
     * mobileBreakpoint is optional.
     * Row click will default to expanding the row and small screens.
     * If needed, mobileBreakpoint can be overwritten in the component.
     * @param props
     */
    onRowClick(props) {
      if (
        (!this.mobileBreakpoint && this.$vuetify.breakpoint.smAndDown) ||
        (this.mobileBreakpoint &&
          this.$vuetify.breakpoint[this.mobileBreakpoint])
      ) {
        props.expanded = !props.expanded;
      } else {
        this.emitEvent('rowClick', props.item, props.index);
      }
    },

    pageChanged(event) {
      if (event.page !== this.pagination.page) {
        this.$emit('pageChanged', event.page);
        this.$vuetify.goTo(0, {
          duration: 900,
          easing: 'easeOutQuint'
        });
      }
    }
  }
};
