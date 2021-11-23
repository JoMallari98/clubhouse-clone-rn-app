import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { PRESET } from '../../constants';
import { BarButton, CircleButton } from '..';
import { colors } from '../../theme';

const PROFILE_ICON = require('../../../assets/profile.png');
const STAR_ICON = require('../../../assets/star.png');
const CLOSE_ICON = require('../../../assets/close.png');

export const FriendRequestListItem = ({
  style,
  item,
  onTap,
  onTapAccept,
  onTapReject,
  ...props
}) => {
  return (
    <TouchableOpacity onPress={() => onTap(item)}>
      <View style={[styles.container, style]}>
        <Image
          source={item?.imageUrl ? { uri: item?.imageUrl } : PROFILE_ICON}
          style={styles.profile}
        />
        <View style={styles.middleRow}>
          <Text style={styles.name}>{item.fullName}</Text>
          <View style={styles.ratingRowContainer}>
            <Image style={styles.star} source={STAR_ICON} />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.acceptBtnContainer}>
          <TouchableOpacity
            onPress={(item) => {
              onTapAccept(item);
            }}
          >
            <Text style={styles.acceptBtnTitle}>Accept</Text>
          </TouchableOpacity>
        </View>
        <CircleButton
          radius={8}
          source={CLOSE_ICON}
          onPress={(item) => {
            onTapReject(item);
          }}
        />
      </View>
    </TouchableOpacity>
  );
};
