import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { PRESET } from '../../constants';

const SEND_ICON = require('../../../assets/send.png');

export const CircleButton = ({
  style,
  source,
  onPress,
  isDisabled,
  size = 32,
  radius = 16,
  ...props
}) => {
  return (
    <View style={[styles(size, radius).container, style]}>
      <TouchableOpacity onPress={onPress}>
        <Image source={source ?? SEND_ICON} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};
