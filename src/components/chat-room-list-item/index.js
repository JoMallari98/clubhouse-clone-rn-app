import React from 'react';
import { useRoute } from '@react-navigation/core';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import { DateUtils } from '../../utils/dateUtils';
import { LinkButton } from '..';

const PROFILE_ICON = require('../../../assets/profile.png');
const STAR_ICON = require('../../../assets/star.png');

export const ChatRoomListItem = ({ style, item, onTap, onTapRejoin }) => {
  const { name, startedTime, chatRoomStatus, imageUrl } = item?.data();
  return (
    <TouchableOpacity
      onPress={() => {
        //onTap(item);
      }}
    >
      <View style={[styles.container, style]}>
        <View style={styles.middleRow}>
          <Text style={styles.title}>{name ?? 'name'}</Text>
          <Text style={styles.date}>{DateUtils.getFormattedDate(startedTime?.toDate()) ?? ''}</Text>
        </View>

        {chatRoomStatus == 'LIVE' && (
          <LinkButton title="Rejoin" onPress={() => onTapRejoin(item)} style={styles.rejoin} />
        )}

        <TouchableOpacity
          onPress={() => {
            onTap(item);
          }}
        >
          <Image source={imageUrl ? { uri: imageUrl } : PROFILE_ICON} style={styles.profile} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
