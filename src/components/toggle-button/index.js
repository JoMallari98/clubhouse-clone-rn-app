import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { PRESET } from '../../constants';

export const ToggleButton = ({
  style,
  titleStyle,
  title,
  id,
  onPress,
  isSelected,
  size = 38,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(id)}
      style={[styles(size).container, styles(size)[isSelected ? 'selectedContainer' : ''], style]}
    >
      <Text
        style={[styles(size).title, styles(size)[isSelected ? 'selectedTitle' : ''], titleStyle]}
      >
        {title ?? ''}
      </Text>
    </TouchableOpacity>
  );
};
