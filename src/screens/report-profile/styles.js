import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, w } from '../../theme';

export default styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    // marginHorizontal: w(20),
    alignItems: 'center',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  toggleContainer: {
    marginTop: w(20),
    width: '85%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButton: {
    // width: '85%',
    // marginHorizontal: '1%',
    marginVertical: '1%',
  },
  tellUsMoreLabel: {
    fontSize: w(16),
    fontWeight: '500',
    fontFamily: fonts.primary,
    textAlign: 'center',
    marginTop: w(24),
  },
  textInput: {
    height: w(80),
    borderColor: colors.palette.lavenderGray,
    borderWidth: 1,
    borderRadius: spacing.sm,
    padding: w(16),
    marginTop: w(14),
    fontFamily: fonts.primary,
    fontSize: w(16),
    fontWeight: '600',
    color: colors.palette.gray,
  },
  topContainer: {
    flex: 1,
    // alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  startALobby: {
    marginBottom: w(32),
    width: '80%',
  },
});
