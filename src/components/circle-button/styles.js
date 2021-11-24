import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';
import { w, h } from '../../theme';

export default styles = (size, radius) =>
  StyleSheet.create({
    container: {
      width: w(size),
      height: w(size),
      borderRadius: radius ? w(radius) : w(size / 2),
      backgroundColor: colors.palette.antiFlashWhite,
      justifyContent: 'center',
      alignItems: 'center',
      //borderWidth: 1,
      //borderColor: colors.palette.black,
    },
    image: {
      width: w(size * (4 / 5)),
      height: w(size * (4 / 5)),
    },
  });
