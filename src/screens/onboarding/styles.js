import { StyleSheet } from 'react-native';
import { colors, fonts, w, h } from '../../theme';

export default styles = StyleSheet.create({
  container: {
    height: w(64),
    width: '100%',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width: '90%',
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
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  signUpButton: {
    marginTop: w(64),
  },
  loginButton: {
    marginTop: w(20),
  },
});
