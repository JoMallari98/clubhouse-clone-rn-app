import { StyleSheet } from 'react-native';
import { w, h, colors, fonts } from '../../theme';

export default styles = (size) =>
  StyleSheet.create({
    // container: {
    //   width: w(size),
    //   height: w(size),
    //   borderRadius: w(size / 4),
    //   overflow: 'hidden',
    // },
    container: {
      width: w(size),
      height: w(size),
      borderRadius: w(size / 4),
      // overflow: 'hidden',
    },
    speakingBorder: {
      borderWidth: 2.5,
      borderColor: colors.palette.cyanBlue,
      padding: 2,
      flex: 1,
      borderRadius: w(size / 4),
    },
    imageContainer: {
      flex: 1,
      alignItems: 'flex-end',
      borderRadius: w(size / 4),
      overflow: 'hidden',

      //margin: 8,
    },
    mutedImageContainer: {
      opacity: 0.5,
      backgroundColor: colors.palette.black,
    },
    imageStyle: {
      resizeMode: 'cover',
    },
    // innerContainer: {
    //   flex: 1,
    //   zIndex: 5,
    //   backgroundColor: colors.palette.blue,
    // },
    micContainer: {
      width: w(size / 2.5),
      height: w(size / 2.5),
      backgroundColor: colors.palette.blue,
      position: 'absolute',
      bottom: -w(size / 14),
      right: -w(size / 14),
      borderRadius: w(size / 5),
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.palette.black,
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 10,
      elevation: 3,
      backgroundColor: 'white',
    },
    micImage: {
      width: w(size / 5),
      height: w(size / 5),
    },
    title: {
      fontSize: w(size / 6),
      fontWeight: '500',
      width: w(size),
      marginTop: w(size / 8),
      textAlign: 'center',
    },
  });
