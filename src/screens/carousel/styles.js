import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';

export default styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontFamily: fonts.primary,
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.palette.white,
  },
  title: {
    color: colors.palette.blue,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
});
