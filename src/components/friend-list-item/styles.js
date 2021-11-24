import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';
import { w, h } from '../../theme';

export default styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: w(12),
    marginBottom: w(12),
  },
  profile: {
    width: w(48),
    height: w(48),
    borderRadius: w(48) / 5,
  },
  middleRow: {
    flex: 1,
    marginLeft: w(10),
  },
  name: {
    fontFamily: fonts.primary,
    fontSize: w(14),
    fontWeight: '600',
  },
  ratingRowContainer: {
    flexDirection: 'row',
    marginTop: w(8),
  },
  star: {},
  rating: {
    fontFamily: fonts.primary,
    fontSize: w(15),
    fontWeight: '500',
    color: colors.palette.sunglow,
    marginLeft: w(10),
  },
  send: {
    width: w(32 * (3 / 6)),
    height: w(32 * (3 / 6)),
  },
});
