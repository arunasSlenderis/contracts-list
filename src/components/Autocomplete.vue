<template>
  <v-autocomplete
    :search-input.sync="search"
    :error-messages="displayedErrors"
    :loading="loading"
    :disabled="disabled"
    :hint="hintText"
    :label="labelText"
    :item-text="textField"
    :items="items"
    :item-value="valueField"
    :clearable="clearable"
    :append-icon="appendedIcon"
    :filter="customFilter"
    v-model="selectedItem"
    return-object
    hide-no-data
    hide-selected
    @click:append="appendedIconClicked"
    @input="emitData"
    @keyup="typing = true"
  />
</template>

<script>
export default {
  name: 'Autocomplete',

  props: {
    labelText: String,
    textField: String,
    item: Object,
    valueField: {
      type: String,
      default: 'id'
    },
    hintText: {
      type: String,
      default: ''
    },
    searchRoute: String,
    searchParams: String,
    errorMessages: Array,
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    appendedIcon: {
      type: String,
      default: 'arrow_drop_down'
    }
  },

  data() {
    return {
      displayedErrors: [],
      items: [],
      typing: false,
      loading: false,
      search: null,
      timer: null,
      selectedItem: {}
    };
  },

  watch: {
    search(val) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        val && val.length > 2 && this.searchItems(val);
      }, 500);
    },

    item() {
      if (this.item) {
        this.selectedItem = { ...this.item };
        this.items = [];
        this.items.push(this.item);
      } else {
        this.selectedItem = {};
        this.items = [];
      }
    },

    errorMessages(val) {
      this.displayedErrors = val;
    }
  },

  created() {
    if (this.item && this.item[this.valueField]) {
      this.selectedItem = { ...this.item } || {};
      this.items.push(this.item);
    }
  },

  methods: {
    customFilter(item, queryText, itemText) {
      let text = itemText.toLowerCase();
      let searchText = queryText.toLowerCase();
      const symbolsToReplace = ['ą', 'č', 'ę', 'ė', 'į', 'š', 'ų', 'ū', 'ž'];
      const replaceWith = ['a', 'c', 'e', 'e', 'i', 's', 'u', 'u', 'z'];
      const symbolCount = symbolsToReplace.length;
      for (let i = 0; i < symbolCount; i++) {
        text = text.replace(symbolsToReplace[i], replaceWith[i]);
        searchText = searchText.replace(symbolsToReplace[i], replaceWith[i]);
      }
      return text.indexOf(searchText) > -1;
    },

    emitData() {
      this.typing = false;
      this.displayedErrors = [];
      this.$emit('itemSelected', this.selectedItem);
    },

    searchItems(v) {
      if (v.length > 2 && this.typing) {
        this.loading = true;
        let query = `${this.searchRoute}${v}`;
        if (this.searchParams) {
          query += `?${this.searchParams}`;
        }
        this.$http.get(query).then(resp => {
          this.items = resp.data;
          this.loading = false;
        });
      }
    },

    appendedIconClicked() {
      this.$emit('appendedIconClicked');
    }
  }
};
</script>
