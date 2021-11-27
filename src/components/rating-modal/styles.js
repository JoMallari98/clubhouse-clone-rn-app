import { StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '../../theme';
import { w, h } from '../../theme';

export default styles = StyleSheet.create({
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  container: {
    //marginHorizontal: spacing.xs,
    //paddingHorizontal: spacing.md,
    // paddingTop: spacing.xxl,
    // paddingBottom: spacing.lg,
    borderTopLeftRadius: spacing.md,
    borderTopRightRadius: spacing.md,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.palette.white,
    // borderRadius: spacing.md,
    alignItems: 'center',
    paddingBottom: w(45),
  },
  visibleContainer: {},
  reportButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
  reportButton: {
    marginRight: w(20),
    marginTop: w(20),
  },
  avatar: {},
  fullName: {
    fontSize: w(24),
    fontWeight: 'bold',
    fontFamily: fonts.primary,
    marginTop: w(20),
  },
  username: {
    fontSize: w(18),
    fontWeight: '600',
    fontFamily: fonts.primary,
    color: colors.palette.lavenderGray,
    marginTop: w(4),
  },
  ratingTitle: {
    fontSize: w(16),
    fontWeight: '500',
    fontFamily: fonts.primary,
    marginTop: w(12),
  },
  ratingBar: {
    marginTop: w(20),
  },
  ratingBtn: {
    width: '70%',
    marginTop: w(48),
  },
});
