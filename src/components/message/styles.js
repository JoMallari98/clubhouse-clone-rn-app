import { StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '../../theme';
import { w, h } from '../../theme';

export default styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
    backgroundColor: colors.palette.white,
    borderRadius: spacing.md,
    alignItems: 'center',
  },
  title: {
    fontSize: fonts.sizes.h1,
    fontFamily: fonts.primary,
    color: colors.palette.black,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: fonts.sizes.h3,
    fontFamily: fonts.primary,
    color: colors.palette.black,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  button: {
    height: w(50),
  },
});
