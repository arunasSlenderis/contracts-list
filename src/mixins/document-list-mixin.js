export default {
  data() {
    return {
      fileOverrideDialog: false,
      apiRoute: 'api/documents/',
      downloadRoute: 'api/document-download/',
      storeAction: 'storeDocuments',
      updateAction: 'updateDocument',
      deleteAction: 'deleteDocument'
    };
  },

  methods: {
    downloadAll(filterParams, packageName) {
      filterParams = `&download=true&${filterParams}`;
      this.$http({
        url: `${this.indexRoute}${filterParams}`,
        method: 'GET',
        responseType: 'blob'
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${packageName}.zip`);
        document.body.appendChild(link);
        link.click();
      });
    },

    openDocument(attachment, nameField) {
      if (!attachment.path) {
        return;
      }
      let fileName;
      if (nameField) {
        fileName = nameField;
      } else {
        fileName = 'file_name';
      }
      this.$http({
        url: `api/document-download/${attachment.id}`,
        method: 'GET',
        responseType: 'blob'
      }).then(response => {
        const fileURL = URL.createObjectURL(response.data);
        const windowRef = window.open(fileURL, attachment[fileName]);
        setTimeout(() => {
          if (!windowRef || (windowRef && !windowRef.self)) {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', attachment[fileName]);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
          }
        }, 500);
      });
    },

    toggleDocumentSeenStatus(item) {
      this.$http
        .post(`${this.apiRoute}set-seen`, {
          document_id: item.id
        })
        .then(() => {
          if (item.seen) {
            this.$set(item, 'seen', null);
          } else {
            this.$set(item, 'seen', {});
          }
        });
    },

    changeDocumentFile(item, index) {
      this.editedItem = JSON.parse(JSON.stringify(item));
      this.editedIndex = index;
      this.fileOverrideDialog = true;
    }
  }
};
