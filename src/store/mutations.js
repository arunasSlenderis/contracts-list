export default {
  storeDocuments(state, documents) {
    state.documents = documents;
  },

  storeDocument(state, doc) {
    state.documents.push(doc);
  },

  setTouchDevice(state) {
    state.isTouchDevice = true;
  },
};
