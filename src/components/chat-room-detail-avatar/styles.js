import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';
import { w, h } from '../../theme';

export default styles = (size) =>
  StyleSheet.create({
    container: {
      // width: '30%',
      width: w(size),
      height: w(size),
      borderRadius: w(size / 4),
    },
    containerBg: {
      width: w(size),
      //height: w(size),
      borderRadius: w(size / 10),
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
    name: {
      fontFamily: fonts.primary,
      fontSize: w(12),
      fontWeight: 'bold',
      marginTop: w(8),
    },
    ratingRowContainer: {
      flexDirection: 'row',
      marginTop: w(8),
      marginBottom: w(16),
    },
    star: {},
    rating: {
      fontFamily: fonts.primary,
      fontSize: w(12),
      fontWeight: '100',
      color: colors.palette.sunglow,
      marginLeft: w(8),
    },
    rateButtonTitle: {
      fontFamily: fonts.primary,
      fontSize: w(12),
      fontWeight: '100',
      color: colors.palette.cyanBlue,
      marginTop: w(8),
    },
  });
