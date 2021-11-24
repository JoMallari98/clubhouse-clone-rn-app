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
  imageStyle,
  ...props
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles(size, radius).container, style]}>
        <Image
          style={[styles(size, radius).image, imageStyle]}
          source={source ?? SEND_ICON}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};
