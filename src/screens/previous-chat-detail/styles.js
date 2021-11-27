import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, w } from '../../theme';

export default styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    marginHorizontal: w(20),
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
});
