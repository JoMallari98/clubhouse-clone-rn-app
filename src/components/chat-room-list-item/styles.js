import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';
import { w, h } from '../../theme';

export default styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: w(12),
    marginBottom: w(12),
    borderColor: colors.palette.lightGrayishBlue,
    borderWidth: 0.5,
    borderRadius: 16,
    paddingHorizontal: w(12),
    paddingVertical: w(12),
  },
  profile: {
    width: w(48),
    height: w(48),
    borderRadius: w(48) / 4,
  },
  middleRow: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.primary,
    fontSize: w(17),
    fontWeight: 'bold',
  },
  date: {
    fontFamily: fonts.primary,
    fontSize: w(15),
    fontWeight: '100',
    marginTop: w(8),
  },
  rejoin: {
    paddingRight: w(16),
    paddingLeft: w(16),
  },
});
