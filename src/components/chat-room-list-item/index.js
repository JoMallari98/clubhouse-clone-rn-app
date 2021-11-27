import React from 'react';
import { useRoute } from '@react-navigation/core';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';

const PROFILE_ICON = require('../../../assets/profile.png');
const STAR_ICON = require('../../../assets/star.png');

export const ChatRoomListItem = ({ style, item, onTap }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('inside child comp');
        onTap(item);
      }}
    >
      <View style={[styles.container, style]}>
        <View style={styles.middleRow}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>

        <Image
          source={item?.imageUrl ? { uri: item?.imageUrl } : PROFILE_ICON}
          style={styles.profile}
        />
      </View>
    </TouchableOpacity>
  );
};
