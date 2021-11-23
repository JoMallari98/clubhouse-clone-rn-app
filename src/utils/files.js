export const getExtention = (fileName) => {
  console.log('get extension : ', fileName.split('.').last);
  return '.' + fileName.split('.').pop();
};
