import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { LinkButton } from '../';
import styles from './styles';

const PROFILE_ICON = require('../../../assets/profile.png');
const STAR_ICON = require('../../../assets/star.png');

export const ChatRoomDetailAvatar = ({
  item,
  style,
  onPressImage,
  isDisabled,
  size = 64,
  ...props
}) => {
  const getImage = () => {
    const renderRatingContainer = () => {
      if (item?.rating) {
        return (
          <View style={styles(size).ratingRowContainer}>
            <Image style={styles(size).star} source={STAR_ICON} />
            <Text style={styles(size).rating}>{item?.rating ?? 0}</Text>
          </View>
        );
      } else {
        return (
          <LinkButton
            title="Rate"
            titleStyle={styles(size).rateButtonTitle}
            onPress={() => onPressImage(item)}
          />
        );
      }
    };

    return (
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={() => onPressImage(item)}>
          <Image
            source={item?.imageUrl ? { uri: item?.imageUrl } : PROFILE_ICON}
            resizeMode="cover"
            style={[styles(size).container, style]}
          />
        </TouchableOpacity>
        <Text style={styles(size).name}>{item?.name}</Text>
        {renderRatingContainer()}
      </View>
    );
  };

  return <TouchableOpacity onPress={() => onPressImage(item)}>{getImage()}</TouchableOpacity>;
};
