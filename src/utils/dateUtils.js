export const DateUtils = {
  getCurrentDate: () => {
    try {
      return new Date();
    } catch (e) {
      return null;
    }
  },
};
