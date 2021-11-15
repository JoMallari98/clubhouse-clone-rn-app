import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, w } from '../../theme';

export default styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  appBarIcon: { width: 40, height: 40 },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: w(20),
    fontWeight: 'bold',
    fontFamily: fonts.primary,
  },
  tripTitle: {
    color: colors.palette.cyanBlue,
  },
  chillTitle: {
    color: colors.palette.darkBlue,
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
  },
  avatar: {
    marginTop: w(32),
  },
  hello: {
    fontSize: w(24),
    fontWeight: 'bold',
    fontFamily: fonts.primary,
    marginTop: w(24),
  },
  welcome: {
    fontSize: w(14),
    fontWeight: '100',
    fontFamily: fonts.primary,
    color: colors.palette.lightSlateGray,
    marginTop: w(4),
  },
  start: {
    width: '37%',
    marginTop: w(48),
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
