import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';
import { w, h } from '../../theme';

export default styles = (size) =>
  StyleSheet.create({
    container: {
      width: w(size),
      height: w(size),
      borderRadius: w(size / 2),
      backgroundColor: colors.palette.antiFlashWhite,
      justifyContent: 'center',
      alignItems: 'center',
      //borderWidth: 1,
      //borderColor: colors.palette.black,
    },
  });
