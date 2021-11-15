import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';
import { w, h } from '../../theme';

export default styles = (size) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: w(size),
      borderRadius: w(size / 6),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: colors.palette.lavenderGray,
      borderWidth: 0.5,
    },
    selectedContainer: {
      backgroundColor: colors.palette.darkBlue,
    },
    title: {
      fontSize: w(size / 3),
      fontWeight: '400',
      fontFamily: fonts.primary,
      textAlign: 'center',
    },
    selectedTitle: {
      color: colors.palette.white,
    },
  });
