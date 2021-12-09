import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';
import { w, h } from '../../theme';

export default styles = (avatarSize, index = 0) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    // containerBg: {
    //   width: w(size),
    //   height: w(size),
    //   borderRadius: w(size / 10),
    //   overflow: 'hidden',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // },
    avatar: {
      width: w(avatarSize),
      height: w(avatarSize),
      borderRadius: w(avatarSize) / 2,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: 'white',
      marginLeft: index > 0 ? -1 * w(avatarSize / 4) : 0,
      zIndex: -1 * index,
    },
  });
