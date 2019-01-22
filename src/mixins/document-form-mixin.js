export default {
  data() {
    return {
      apiRoute: 'api/documents/',
      documentDatePicker: false,
      allowedFileFormats: '.pdf, .doc, .docx, .png, .jpg, .jpeg'
    };
  },

  methods: {
    saveNew() {
      const requestBody = this.getFormData();
      this.$http
        .post(`${this.apiRoute}`, requestBody, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          if (response.data.length) {
            this.$store.dispatch('addDocuments', response.data);
          } else {
            this.$store.dispatch('storeDocument', response.data);
          }
          this.$emit('dialogClosed');
        })
        .catch(error => {
          this.handleBackendErrors(error);
        });
    },

    saveExisting() {
      this.$http
        .put(`${this.apiRoute}${this.item.id}`, this.item)
        .then(response => {
          this.$store.dispatch('updateDocument', {
            index: this.index,
            item: response.data
          });
          this.$emit('dialogClosed');
        })
        .catch(error => {
          this.handleBackendErrors(error);
        });
    },

    getFormData() {
      let requestBody = new FormData();
      for (let key in this.item) {
        if (this.item[key] && key !== 'employee') {
          if (
            key === 'is_signed_by_all_signees' ||
            key === 'is_signatures_needed'
          ) {
            requestBody.append(key, +this.item[key]);
          } else {
            requestBody.append(key, this.item[key]);
          }
        }
      }
      return requestBody;
    },

    setFile(event) {
      this.item.file = event[0];
    }
  }
};
