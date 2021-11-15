import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { colors, fonts, h, spacing, w } from '../../theme';

export default styles = (isAlign = false, containerHeight = 0) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flexGrow: 1,
    },
    scrollContainer: {
      flex: 1,
    },
    container: {
      height: containerHeight,
      paddingHorizontal: spacing.xl,
      marginTop: '2%',
    },
    topContainer: {
      flex: 1,
    },
    participantsContainer: {
      flex: 1,
      // marginBottom: 100,
    },
    participant: {
      position: 'absolute',
    },
    leftParticipant: {
      left: isAlign ? '10%' : 0,
    },
    rightParticipant: {
      right: isAlign ? '10%' : 0,
    },
    middleParticipant: {
      left: '40%',
    },
    bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: w(20),
    },
    searchingForRoom: {
      fontSize: w(16),
      fontWeight: '100',
      fontFamily: fonts.primary,
      color: colors.palette.lavenderGray,
    },
    leaveRoomContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    leaveRoom: {
      marginBottom: w(32),
      marginTop: w(16),
      width: '100%',
    },
    tapToMuteContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tapToMute: {
      marginBottom: w(32),
      marginTop: w(16),
      width: '100%',
      justifyContent: 'center',
      alignContent: 'center',
    },
    tapToMuteTitle: {
      textAlign: 'center',
    },
  });
