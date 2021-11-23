import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import styles from './styles';
import { PRESET } from '../../constants';

const ROUNDED_CAMERA = require('../../../assets/rounded_camera.png');

export const Avatar = ({
  style,
  source,
  isVisibleCamera,
  onPress,
  isDisabled,
  size = 64,
  ...props
}) => {
  const getImage = () => {
    if (isVisibleCamera) {
      return (
        <ImageBackground
          source={source}
          resizeMode="cover"
          style={[styles(size).containerBg, style]}
        >
          <Image source={ROUNDED_CAMERA} style={styles(size).camera} resizeMode="contain" />
        </ImageBackground>
      );
    } else {
      return <Image source={source} resizeMode="cover" style={[styles(size).container, style]} />;
    }
  };

  return <TouchableOpacity onPress={onPress}>{getImage()}</TouchableOpacity>;
};
