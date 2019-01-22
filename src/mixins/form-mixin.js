export default {
  props: {
    dialog: Boolean,
    index: Number,
    item: Object
  },

  data() {
    return {
      requestPending: false
    };
  },

  watch: {
    dialog(val) {
      this.$validator.reset();
      if (!val) {
        for (let key in this.backendErrors) {
          this.backendErrors[key] = [];
        }
      } else {
        this.requestPending = false;
        this.prepareForm();
      }
    }
  },

  created() {
    this.prepareForm();
  },

  methods: {
    // override inside components when additional actions need to be performed
    // when the form is opened
    prepareForm() {},

    save(apiRoute) {
      this.$validator.validate().then(passed => {
        if (passed) {
          let idField;
          const requestBody = JSON.parse(JSON.stringify(this.item));
          for (let key in requestBody) {
            if (key.indexOf('_id') > -1) {
              idField = key.slice(0, key.length - 3);
              if (requestBody[idField]) {
                delete requestBody[idField];
              }
            }
          }
          this.requestPending = true;
          if (this.index > -1) {
            this.$http
              .put(`${apiRoute}${requestBody.id}`, requestBody)
              .then(response => {
                if (this.updateAction) {
                  this.$store.dispatch(this.updateAction, {
                    index: this.index,
                    item: response.data
                  });
                  this.close();
                } else {
                  this.$emit('itemUpdated', response.data);
                }
              })
              .catch(error => {
                this.handleBackendErrors(error);
              });
          } else {
            this.$http
              .post(`${apiRoute}`, requestBody)
              .then(response => {
                if (this.createAction) {
                  this.$store.dispatch(this.createAction, response.data);
                  this.close();
                } else {
                  this.$emit('itemCreated', response.data);
                }
              })
              .catch(error => {
                this.handleBackendErrors(error);
              });
          }
        }
      });
    },

    setAutocompleteValue(item, objectField, idField) {
      if (item) {
        this.item[objectField] = item;
        this.item[idField] = item.id;
      } else {
        this.item[objectField] = null;
        this.item[idField] = null;
      }
    },

    setMultiselectValue(items, arrayField) {
      this.item[arrayField] = items;
    },

    validateField(field) {
      setTimeout(() => {
        this.$validator.validate(field);
      }, 100);
    },

    clearErrors(field) {
      this.backendErrors[field] = [];
    },

    handleBackendErrors(error) {
      this.requestPending = false;
      if (error.response && error.response.status === 422) {
        for (let key in error.response.data.errors) {
          this.backendErrors[key] = error.response.data.errors[key];
        }
      }
    },

    close(type) {
      this.$emit('dialogClosed', type);
    }
  }
};
