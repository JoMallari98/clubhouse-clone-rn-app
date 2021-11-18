import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { PRESET } from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme';

export const GradientBarButton = ({
  style,
  titleStyle,
  title,
  onPress,
  isDisabled,
  preset = PRESET.INFO,
  prefixIcon,
  suffixIcon,
  size = 64,
  ...props
}) => {
  return (
    <TouchableOpacity style={styles.buttonWrapper}>
      <LinearGradient
        colors={[colors.palette.softBlue, colors.palette.cyanBlue]}
        style={styles(size).linearGradient}
        start={{ y: 0.0, x: 0.0 }}
        end={{ y: 1, x: 0 }}
      >
        <Text style={styles(size).buttonText}>Upgrade to Premium</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
