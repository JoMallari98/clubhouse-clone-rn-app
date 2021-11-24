import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { AppBar, Avatar } from '../../components';

import styles from './styles';

const PROFILE_ICON = require('../../../assets/profile.png');
const RATING_ICON = require('../../../assets/rating.png');
const CHAT_CIRCLE = require('../../../assets/chat_circle.png');
const ADD_FRIEND = require('../../../assets/add_friend.png');

export const ThirdPartyProfileScreen = () => {
  // const {isFrien} = useParams()
  const navigation = useNavigation();
  const route = useRoute();

  const { item, uid } = route.params;

  const { user } = useSelector((state) => state.general);
  useEffect(() => {}, [user]);

  const renderPreviousChatsButton = () => {
    const friend = item?.friends?.filter((el) => {
      return el.id == uid;
    });
    console.log('render friend : )))', friend);
    if (friend[0]?.status == 'accepted') {
      return (
        <View style={styles.previousChatButtonContainer}>
          <TouchableOpacity style={styles.previousChatButtonInnerContainer}>
            <Image source={ADD_FRIEND} style={styles.infoButtonIcon} />
            <Text style={styles.previousChatButtonTitle}>Friends</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (friend[0]?.status == 'received_requests') {
      return (
        <View style={styles.previousChatButtonContainer}>
          <TouchableOpacity style={styles.previousChatButtonInnerContainer}>
            <Image source={ADD_FRIEND} style={styles.infoButtonIcon} />
            <Text style={styles.previousChatButtonTitle}>Accept</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (friend[0]?.status == 'sent_requests') {
      return (
        <View style={styles.previousChatButtonContainer}>
          <TouchableOpacity style={styles.previousChatButtonInnerContainer}>
            <Image source={ADD_FRIEND} style={styles.infoButtonIcon} />
            <Text style={styles.previousChatButtonTitle}>Pending</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.previousChatButtonContainer}>
          <TouchableOpacity style={styles.previousChatButtonInnerContainer}>
            <Image source={ADD_FRIEND} style={styles.infoButtonIcon} />
            <Text style={styles.previousChatButtonTitle}>Add Friend</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const renderRatingButton = () => {
    return (
      <View style={styles.ratingButtonContainer}>
        <TouchableOpacity style={styles.ratingButtonInnerContainer}>
          <Image source={RATING_ICON} style={styles.infoButtonIcon} />
          <Text style={styles.rateTitle}>{item?.rating ?? 0}</Text>
          <Text style={styles.rateCountTitle}>({item?.numberOfRatings ?? 0})</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderInfoButtonContainer = () => {
    return (
      <View style={styles.infoButtonContainer}>
        {renderRatingButton()}
        {renderPreviousChatsButton()}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar />
      <AppBar
        title="Account"
        rightIcon={CHAT_CIRCLE}
        rightIconStyles={styles.appBarIcon}
        onPressRightIcon={() => {}}
      />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Avatar
            style={styles.avatar}
            source={item?.imageUrl ? { uri: item?.imageUrl } : PROFILE_ICON}
            isVisibleCamera={false}
            size={120}
          />

          <Text style={styles.name}>{item?.fullName}</Text>
          <Text style={styles.username}>{item?.username ?? ''}</Text>

          {renderInfoButtonContainer()}
        </View>
      </View>
    </SafeAreaView>
  );
};
