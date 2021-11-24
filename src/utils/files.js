export const getExtention = (fileName) => {
  return '.' + fileName.split('.').pop();
};
