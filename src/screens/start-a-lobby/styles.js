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
  lobbyNameContainer: {
    marginTop: w(0),
    justifyContent: 'center',
  },
  chatRoomContainer: {},
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
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%',
    marginBottom: w(24),
    marginTop: w(16),
  },
  lobbyInputContainer: {
    marginTop: w(20),
    flexDirection: 'row',
  },
  lobbyNameInput: {
    width: '75%',
    height: w(38),
    borderRadius: 8,
    borderColor: colors.palette.lavenderGray,
    borderWidth: 0.5,
    paddingHorizontal: w(8),
  },
  createARoom: {
    marginBottom: w(32),
    marginTop: w(16),
    width: '80%',
  },
});
