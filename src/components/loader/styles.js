import { StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '../../theme';
import { w, h } from '../../theme';

export default styles = StyleSheet.create({
  modalContainer: {
    opacity: 0,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: {
    fontSize: fonts.sizes.h3,
    fontFamily: fonts.primary,
    color: colors.palette.black,
    fontWeight: 'w100',
    marginTop: spacing.md,
  },
});
