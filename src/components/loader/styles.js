import { StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '../../theme';
import { w, h } from '../../theme';

export default styles = StyleSheet.create({
  modalContainer: {
    opacity: 0,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: colors.palette.black,
    // opacity: 0.6,
  },
  title: {
    fontSize: fonts.sizes.h3,
    fontFamily: fonts.primary,
    color: colors.palette.black,
    fontWeight: 'w100',
    marginTop: spacing.md,
  },
});
