export const DateUtils = {
  getCurrentDate: () => {
    try {
      return new Date();
    } catch (e) {
      return null;
    }
  },

  getFormattedDate: (date) => {
    console.log('date receive date', date);
    if (date != null) {
      const formattedDate =
        date?.getDate() +
        '.' +
        (date?.getMonth() + 1) +
        '.' +
        date?.getFullYear() +
        ' - ' +
        date?.getHours() +
        ':' +
        date?.getMinutes() +
        (date?.getHours() >= 12 ? 'PM' : 'AM');
      console.log('formatted date ', formattedDate);
      return formattedDate;
    }
    return '';
  },
};
//21.10.2021 - 8:49PM
