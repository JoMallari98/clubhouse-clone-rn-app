import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { colors, fonts, spacing, w } from '../../theme';

export default styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    marginTop: '2%',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  searchingForRoom: {
    fontSize: w(16),
    fontWeight: '100',
    fontFamily: fonts.primary,
    color: colors.palette.lavenderGray,
  },
  cancel: {
    marginBottom: w(32),
    marginTop: w(16),
    width: '80%',
  },
});
