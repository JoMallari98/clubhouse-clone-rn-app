import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';
import { w, h } from '../../theme';

export default styles = (size) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: w(size),
      borderRadius: h(size / 4),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    infoContainer: {
      backgroundColor: colors.palette.white,
      borderColor: colors.palette.lavenderGray,
      borderWidth: 0.5,
    },
    successContainer: {
      backgroundColor: colors.palette.darkBlue,
    },
    primaryContainer: {
      backgroundColor: colors.palette.softBlue,
    },
    errorContainer: {
      backgroundColor: colors.palette.brightRed,
    },
    disabledContainer: {
      backgroundColor: colors.palette.lavenderGray,
    },
    title: {
      fontSize: w(size / 3),
      fontWeight: 'bold',
      fontFamily: fonts.primary,
      textAlign: 'center',
    },
    infoTitle: {
      color: colors.palette.black,
    },
    successTitle: {
      color: colors.palette.white,
    },
    primaryTitle: {
      color: colors.palette.white,
    },
    errorTitle: {
      color: colors.palette.white,
    },
    disabledTitle: {
      color: colors.palette.white,
    },
    iconContainer: {
      width: w(size / 2),
      height: w(size / 2),
      justifyContent: 'center',
      alignItems: 'center',
    },
    prefix: {
      marginRight: w(20),
    },
    suffix: {
      marginLeft: w(20),
    },
  });
