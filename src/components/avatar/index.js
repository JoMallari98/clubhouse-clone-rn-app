import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { PRESET } from '../../constants';

export const Avatar = ({ style, source, onPress, isDisabled, size = 64, ...props }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={source} resizeMode="contain" style={[styles(size).container, style]} />
    </TouchableOpacity>
  );
};
