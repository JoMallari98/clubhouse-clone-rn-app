import { StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '../../theme';
import { w, h } from '../../theme';

export default styles = StyleSheet.create({
  container: {},
  textInput: {
    borderColor: colors.palette.lightGreen,
    borderWidth: 1,
    borderRadius: spacing.sm,
    padding: w(16),
    marginTop: w(14),
    fontFamily: fonts.primary,
    fontSize: w(16),
    fontWeight: '600',
    color: colors.palette.gray,
  },
  errorTextInput: {
    borderColor: colors.palette.brightRed,
  },
  label: {
    fontFamily: fonts.primary,
    fontSize: w(20),
    fontWeight: '600',
  },
  placeholder: {
    fontFamily: fonts.primary,
    fontSize: w(16),
    fontWeight: '600',
    color: colors.palette.lavenderGray,
  },
  error: {
    fontFamily: fonts.primary,
    fontSize: w(16),
    fontWeight: '100',
    color: colors.palette.brightRed,
    marginTop: spacing.sm,
  },
});
