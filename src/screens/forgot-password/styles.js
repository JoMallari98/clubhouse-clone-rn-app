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
    marginTop: '2%',
  },
  topContainer: {},
  bottomContainer: {},
  title: {
    fontFamily: fonts.primary,
    fontSize: w(36),
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: '10%',
    fontFamily: fonts.primary,
    fontSize: w(17),
    fontWeight: '400',
    color: colors.palette.rollingStation,
  },
  emailContainer: {
    marginTop: '20%',
  },
  submitButton: {
    marginBottom: '10%',
  },
});
