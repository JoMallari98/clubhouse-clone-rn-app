import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { PRESET } from '../../constants';
import { CircleButton } from '..';

const PROFILE_ICON = require('../../../assets/profile.png');
const STAR_ICON = require('../../../assets/star.png');

export const FriendListItem = ({ style, item, onTap, onTapChat, ...props }) => {
  return (
    <TouchableOpacity onPress={() => onTap(item)}>
      <View style={[styles.container, style]}>
        <Image source={PROFILE_ICON} style={styles.profile} />
        <View style={styles.middleRow}>
          <Text style={styles.name}>{item.fullName}</Text>
          <View style={styles.ratingRowContainer}>
            <Image style={styles.star} source={STAR_ICON} />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
        <CircleButton onPress={() => onTapChat(item)} />
      </View>
    </TouchableOpacity>
  );
};
