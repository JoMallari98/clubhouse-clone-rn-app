import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { colors, fonts, spacing, w } from '../../theme';

export default styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    marginTop: '10%',
  },
  topContainer: {},
  bottomContainer: {},
  title: {
    marginTop: '10%',
    fontFamily: fonts.primary,
    fontSize: w(36),
    fontWeight: 'bold',
  },
  emailContainer: {
    marginTop: '20%',
  },
  passwordContainer: {
    marginTop: '10%',
  },
  forgotPasswordContainer: {
    marginVertical: '5%',
  },
  loginButton: {
    marginBottom: '10%',
  },
  haveAccountContainer: {
    marginBottom: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  doYouHaveTitle: {
    fontFamily: fonts.primary,
    fontSize: w(16),
    fontWeight: '400',
    color: colors.palette.lavenderGray,
  },
  signUpTitle: {
    fontFamily: fonts.primary,
    fontSize: w(16),
    fontWeight: '400',
  },
});
