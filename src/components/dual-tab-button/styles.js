import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';
import { w, h } from '../../theme';

export default styles = (size) =>
  StyleSheet.create({
    container: {
      width: '70%',
      flexDirection: 'row',
      backgroundColor: colors.palette.seaShell,
      borderRadius: w(size / 8),
      padding: w(size / 10),
    },
    buttonContainer: {
      height: w(size),
      flex: 1,
      borderRadius: w(size / 8),
      justifyContent: 'center',
      alignItems: 'center',
    },
    defaultButtonContainer: {
      backgroundColor: colors.transparent,
    },
    activeButtonContainer: {
      backgroundColor: colors.palette.cyanBlue,
    },
    buttonTitle: {
      fontSize: w(16),
      fontFamily: fonts.primary,
    },
    defaultButtonTitle: {
      color: colors.palette.davysGray,
    },
    activeButtonTitle: {
      color: colors.palette.white,
    },
  });
