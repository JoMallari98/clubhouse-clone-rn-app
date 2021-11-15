import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';
import { w, h } from '../../theme';

export default styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: w(14),
    fontWeight: '400',
    fontFamily: fonts.primary,

    // textDecorationLine: 'underline'
  },
  infoTitle: {
    color: colors.palette.black,
  },
  successTitle: {
    color: colors.palette.cyanBlue,
  },
  primaryTitle: {
    color: colors.palette.softBlue,
  },
  errorTitle: {
    color: colors.palette.brightRed,
  },
});
