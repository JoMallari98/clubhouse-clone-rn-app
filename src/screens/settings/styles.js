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
    width: '100%',
    paddingHorizontal: spacing.xl,
  },
  topContainer: {
    flex: 1,
    width: '100%',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  emailContainer: {
    marginTop: '6%',
  },
  toggleButton: {
    marginTop: w(24),
  },
});
