import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';
import { w, h, spacing } from '../../theme';

export default styles = StyleSheet.create({
  container: {
    height: h(80),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  leftContainer: { width: w(40) },
  leftIcon: {},
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: w(20),
    fontWeight: '400',
    fontFamily: fonts.primary,
    textAlign: 'center',
  },
  rightContainer: { width: w(40) },
  rightIcon: {},
});
