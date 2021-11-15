import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';
import { w, h } from '../../theme';

export default styles = (size) =>
  StyleSheet.create({
    container: {
      width: w(size),
      height: w(size),
      borderRadius: w(size / 10),
      borderWidth: 1,
      borderColor: colors.palette.black,
    },
  });
