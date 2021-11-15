import Toast from 'react-native-toast-message';

export const showToast = ({ message, type = 'error' }) => {
  Toast?.show({
    type: type,
    position: 'bottom',
    text2: message,
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
};
