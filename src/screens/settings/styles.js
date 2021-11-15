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
  sectionContainer: {
    alignItems: 'center',
    marginTop: w(24),
  },
  chatRoomContainer: {
    marginTop: w(0),
  },
  commuteTypeContainer: {},
  poolSizeContainer: {},
  sectionTitle: {
    fontSize: w(16),
    fontWeight: '600',
    fontFamily: fonts.primary,
  },
  toggleContainer: {
    marginTop: w(20),
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  toggleButton: {
    width: '45%',
    marginHorizontal: '1%',
    marginVertical: '1%',
  },
  advertizedToggleButton: {
    width: '92%',
    marginHorizontal: '1%',
    marginVertical: '1%',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  findARoom: {
    marginBottom: w(32),
    marginTop: w(16),
    width: '80%',
  },
});
