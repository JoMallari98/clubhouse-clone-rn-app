import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';

const toastStyle = {
  alignItems: 'center',
  borderRadius: 8,
  flexDirection: 'row',
  justifyContent: 'space-between',
  // height: 50,
  paddingHorizontal: 10,
  borderWidth: 1,
};

const textStyle = {
  fontFamily: fonts.primary,
  color: colors.palette.black,
  fontSize: 11,
  width: '90%',
  paddingVertical: 10,
  paddingLeft: 10,
};

export default StyleSheet.create({
  containerStyle: {
    width: '85%',
  },
  leftContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  closeIcon: {
    padding: 10,
    right: 15,
  },
  infoText: {
    ...textStyle,
    color: colors.palette.black,
  },
  successText: {
    ...textStyle,
    color: colors.palette.black,
  },
  errorText: {
    ...textStyle,
    color: colors.palette.black,
  },
  infoToast: {
    ...toastStyle,
    backgroundColor: colors.background,
    borderColor: colors.palette.lavenderGray,
  },
  successToast: {
    ...toastStyle,
    backgroundColor: colors.background,
    borderColor: colors.palette.blue,
  },
  errorToast: {
    ...toastStyle,
    backgroundColor: colors.background,
    borderColor: colors.palette.brightRed,
  },
});
