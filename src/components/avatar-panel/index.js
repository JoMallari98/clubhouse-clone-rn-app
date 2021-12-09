import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import styles from './styles';
import { PRESET } from '../../constants';

const ROUNDED_CAMERA = require('../../../assets/rounded_camera.png');

export const AvatarPanel = ({ style, avatarSize = 32, data, ...props }) => {
  console.log('AVATAR PANEL : ', data);
  const avatar = ({ imageUrl, id }, index) => {
    console.log('index --> ', index);
    return (
      <Image
        key={id}
        source={{ uri: imageUrl }}
        style={styles(avatarSize, index).avatar}
        resizeMode="cover"
      />
    );
  };

  return (
    <View style={[styles(avatarSize).container, style]}>
      {data.map((element, index) => {
        return avatar(element, index);
      })}
    </View>
  );
};
