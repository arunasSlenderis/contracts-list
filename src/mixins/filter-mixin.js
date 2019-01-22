export default {
  data() {
    return {
      filterParams: ''
    };
  },

  methods: {
    setFilterAutocomplete(key, value, chipField) {
      if (value) {
        const chipValue = this.getValueByKey(value, chipField); // for multi-level deep properties
        this.autocompletes[key] = value;
        this.dataToFilter.chipData[key] = chipValue;
        if (value.id) {
          this.dataToFilter[key] = value.id;
        } else if (value.user_id) {
          this.dataToFilter[key] = value.user_id;
        }
      } else {
        this.autocompletes[key] = null;
        delete this.dataToFilter.chipData[key];
        delete this.dataToFilter[key];
      }
    },

    setFilterText(key) {
      if (this.dataToFilter[key]) {
        this.dataToFilter.chipData[key] = this.dataToFilter[key];
      } else {
        delete this.dataToFilter.chipData[key];
      }
    },

    setFilterSelect(key, value) {
      const index = value.indexOf('null');
      if (this.dataToFilter[key] && index === -1) {
        this.dataToFilter.chipData[key] = value;
      } else {
        this.$set(this.dataToFilter, key, null);
        delete this.dataToFilter.chipData[key];
      }
    },

    setFilterRadioGroup(key, value, text) {
      if (value) {
        this.dataToFilter[key] = value;
        this.dataToFilter.chipData[key] = text;
      } else {
        this.$set(this.dataToFilter, key, null);
        delete this.dataToFilter.chipData[key];
      }
    },

    setFilterDate(key, value, picker) {
      this.dataToFilter[key] = value;
      this.dataToFilter.chipData[key] = value;
      this[picker] = false;
    },

    updateFilter() {
      this.filterParams = '';
      for (let key in this.dataToFilter) {
        if (key !== 'chipData' && this.dataToFilter[key]) {
          this.filterParams += `${key}=${this.dataToFilter[key]}&`;
        }
      }
      this.filterParams = this.filterParams.substring(
        0,
        this.filterParams.length - 1
      );
      this.$emit('filterUpdated', this.filterParams);
    },

    removeFilterItem(item) {
      for (let filter in this.dataToFilter) {
        for (let key in this.autocompletes) {
          if (key === filter) {
            this.autocompletes[key] = null;
            break;
          }
        }
        if (filter === item.title) {
          this.$set(this.dataToFilter, filter, null);
          delete this.dataToFilter.chipData[filter];
          this.updateFilter();
          break;
        }
      }
    },

    clearFilter() {
      for (let key in this.dataToFilter) {
        if (key === 'chipData') {
          this.$set(this.dataToFilter, key, {});
        } else {
          this.$set(this.dataToFilter, key, null);
        }
      }
      for (let key in this.autocompletes) {
        this.autocompletes[key] = null;
      }
      this.filterParams = '';
      this.$emit('filterUpdated', this.filterParams);
    },

    getValueByKey(obj, path) {
      path = path.split('.');
      let current = obj;
      while (path.length) {
        if (typeof current !== 'object') {
          return null;
        }
        current = current[path.shift()];
      }
      return current;
    }
  }
};
