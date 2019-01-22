export default {
  methods: {
    formatDate(date) {
      if (date) {
        const d = new Date(date);
        if (d instanceof Date && !isNaN(d)) {
          let [year, month, day] = date.split('-');
          if (!year) {
            year = '2010';
          }
          if (!month) {
            month = '01';
          }
          if (!day) {
            day = '01';
          }
          return `${year}-${month}-${day}`;
        } else {
          return null;
        }
      } else {
        return null;
      }
    },

    formatInputDate(type, date) {
      const formattedDate = this.formatDate(date);
      this.dataToFilter[type] = formattedDate;
      this.dataToFilter.chipData[type] = formattedDate;
    }
  }
};
