import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { colors, fonts, spacing, w, h } from '../../theme';

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
  },
  topContainer: {},
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.primary,
    fontSize: w(36),
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: '10%',
    fontFamily: fonts.primary,
    fontSize: w(18),
    fontWeight: '400',
    color: colors.palette.rollingStation,
  },
  emailContainer: {
    marginTop: '20%',
  },
  submitButton: {
    marginTop: '10%',
    width: '80%',
  },
  didNotReceiveEmailContainer: {
    marginBottom: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  didNotReceiveEmail: {
    fontFamily: fonts.primary,
    fontSize: w(16),
    fontWeight: '400',
    color: colors.palette.lavenderGray,
  },
  resendTitle: {
    fontFamily: fonts.primary,
    fontSize: w(16),
    fontWeight: '400',
  },
  icon: {
    alignSelf: 'flex-end',
  },
});
