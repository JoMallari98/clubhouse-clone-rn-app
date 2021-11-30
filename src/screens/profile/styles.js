import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, w } from '../../theme';

export default styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    //marginBottom: 200
  },
  appBarIcon: { width: 28, height: 28, marginLeft: w(16) },
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
  topContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: w(20),
    left: w(20),
    right: w(20),
  },
  avatar: {
    //marginTop: w(8),
  },
  name: {
    fontSize: w(20),
    fontWeight: 'bold',
    fontFamily: fonts.primary,
    marginTop: w(8),
  },
  username: {
    fontSize: w(14),
    fontWeight: '600',
    fontFamily: fonts.primary,
    color: colors.palette.lavenderGray,
    marginTop: w(4),
  },
  infoButtonContainer: {
    flexDirection: 'row',
    width: '90%',
    height: w(48),
    marginHorizontal: w(20),
    marginTop: w(8),
  },
  ratingButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.palette.lightGrayishBlue,
    borderWidth: 0.5,
    marginRight: w(5),
    paddingHorizontal: w(8),
    borderRadius: 12,
  },
  ratingButtonInnerContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: colors.palette.blue
  },
  previousChatButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: colors.palette.lightGrayishBlue,
    borderWidth: 0.5,
    marginLeft: w(5),
    paddingHorizontal: w(8),
    borderRadius: 12,
  },
  previousChatButtonInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    //backgroundColor: colors.palette.blue
  },
  previousChatButtonTitle: {
    fontFamily: fonts.primary,
    fontSize: w(12),
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginLeft: w(10),
  },
  rateTitle: {
    fontFamily: fonts.primary,
    fontSize: w(12),
    fontWeight: 'bold',
    color: colors.palette.sunglow,
    marginLeft: w(10),
  },
  rateCountTitle: {
    fontFamily: fonts.primary,
    fontSize: w(12),
    fontWeight: '100',
    color: colors.palette.greyChateau,
    marginLeft: w(5),
  },
  infoButtonIcon: {
    width: w(32),
    height: w(32),
  },
  friendListContainer: {
    width: '90%',
    //marginHorizontal: w(20),
    marginTop: w(8),
    //height: w(250),
    height: '40%',
  },
  friendListTitleContainer: {
    flexDirection: 'row',
    marginBottom: w(8),
  },
  handIcon: {
    fontSize: w(14),
  },
  friendListTitle: {
    fontFamily: fonts.primary,
    fontSize: w(16),
    fontWeight: '500',
    color: colors.palette.grayishBlue,
    marginLeft: w(5),
  },
  startALobby: {
    //marginBottom: w(24),
    //width: '80%',
  },
  send: {
    width: w(32 * (3 / 6)),
    height: w(32 * (3 / 6)),
  },
});
