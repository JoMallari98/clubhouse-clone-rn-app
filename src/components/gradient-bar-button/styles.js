import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';
import { w, h } from '../../theme';

export default styles = (size) =>
  StyleSheet.create({
    linearGradient: {
      flex: 1,
      height: w(size),
      paddingLeft: w(20),
      paddingRight: w(20),
      borderRadius: w(size) / 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonWrapper: {
      // flex: 1
    },
    buttonText: {
      fontSize: w(size / 3),
      fontWeight: 'bold',
      fontFamily: fonts.primary,
      textAlign: 'center',
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
  });
