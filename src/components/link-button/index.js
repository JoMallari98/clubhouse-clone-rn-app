import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { PRESET } from '../../constants';

export const LinkButton = ({
  style,
  titleStyle,
  title,
  onPress,
  preset = PRESET.INFO,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, styles[preset + 'Container'], style]}
    >
      <Text style={[styles.title, styles[preset + 'Title'], titleStyle]}>{title ?? ''}</Text>
    </TouchableOpacity>
  );
};
