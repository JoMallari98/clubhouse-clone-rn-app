import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import {
  BarButton,
  AppBar,
  Avatar,
  Message,
  FriendListItem,
  GradientBarButton,
} from '../../components';
import { APP_STATUS, PRESET } from '../../constants';
import { setAppStatus } from '../../redux/general/generalSlice';
import { colors, w } from '../../theme';

import styles from './styles';

const EDIT_ICON = require('../../../assets/edit.png');
const PROFILE_ICON = require('../../../assets/profile.png');
const CHAT_HISTORY_ICON = require('../../../assets/chat_history.png');
const RATING_ICON = require('../../../assets/rating.png');
const CHAT_CIRCLE = require('../../../assets/chat_circle.png');
const ADD_FRIEND = require('../../../assets/add_friend.png');
const FRIEND_STATUS = require('../../../assets/friend_status.png');

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Adam Joy',
    rating: '4.9',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Root Miller',
    rating: '4.8',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Tim cook',
    rating: '5.0',
  },
];

export const ThirdPartyProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const {isFrien} = useParams()

  const { user } = useSelector((state) => state.general);
  useEffect(() => {}, [user]);

  const renderPreviousChatsButton = () => {
    return (
      <View style={styles.previousChatButtonContainer}>
        <TouchableOpacity style={styles.previousChatButtonInnerContainer}>
          <Image source={ADD_FRIEND} style={styles.infoButtonIcon} />
          <Text style={styles.previousChatButtonTitle}>Add Friend</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderRatingButton = () => {
    return (
      <View style={styles.ratingButtonContainer}>
        <TouchableOpacity style={styles.ratingButtonInnerContainer}>
          <Image source={RATING_ICON} style={styles.infoButtonIcon} />
          <Text style={styles.rateTitle}>4.9</Text>
          <Text style={styles.rateCountTitle}>(59)</Text>
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
          <Avatar style={styles.avatar} source={PROFILE_ICON} isVisibleCamera={false} size={120} />

          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.username}>@johnd</Text>

          {renderInfoButtonContainer()}
        </View>
      </View>
    </SafeAreaView>
  );
};
