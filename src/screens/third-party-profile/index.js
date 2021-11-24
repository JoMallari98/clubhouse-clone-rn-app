import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Avatar, Loader, showToast } from '../../components';

import styles from './styles';

const PROFILE_ICON = require('../../../assets/profile.png');
const RATING_ICON = require('../../../assets/rating.png');
const CHAT_CIRCLE = require('../../../assets/chat_circle.png');
const ADD_FRIEND = require('../../../assets/add_friend.png');

import {
  triggerGetFriends,
  triggerSendFriendRequest,
  triggerCancelFriendRequest,
  triggerAcceptReceivedFriendRequest,
  triggerRejectReceivedFriendRequest,
} from '../../redux/friends/friendsSlice';

export const ThirdPartyProfileScreen = () => {
  // const {isFrien} = useParams()
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const { item, uid } = route.params;

  const { user } = useSelector((state) => state.general);
  const {
    friends,
    allUsers,
    suggestedFriends,
    receivedFriendRequests,
    isLoadingGetFriends,
    getFriendsError,
    getFriendsSuccess,
    isLoadingSendFriendRequest,
    sendFriendRequestError,
    sendFriendRequestSuccess,
    isLoadingCancelFriendRequest,
    cancelFriendRequestError,
    cancelFriendRequestSuccess,
    isLoadingAcceptReceivedFriendRequest,
    acceptReceivedFriendRequestError,
    acceptReceivedFriendRequestSuccess,
    isLoadingRejectReceivedFriendRequest,
    rejectReceivedFriendRequestError,
    rejectReceivedFriendRequestSuccess,
  } = useSelector((state) => state.friends);

  const [frienStatus, setFriendStatus] = useState(null);

  useEffect(() => {
    updateFriendStatus();
  }, [item]);

  useEffect(() => {
    if (isLoadingGetFriends) return;
    if (getFriendsError) return;
    if (getFriendsSuccess) {
      updateFriendStatus();
    }
  }, [isLoadingGetFriends]);

  useEffect(() => {
    if (isLoadingSendFriendRequest) return;
    if (sendFriendRequestError) return showToast({ message: sendFriendRequestError });
    if (sendFriendRequestSuccess) {
      dispatch(triggerGetFriends(user?.uid));
    }
  }, [isLoadingSendFriendRequest]);

  useEffect(() => {
    if (isLoadingCancelFriendRequest) return;
    if (cancelFriendRequestError) return showToast({ message: cancelFriendRequestError });
    if (cancelFriendRequestSuccess) {
      dispatch(triggerGetFriends(user?.uid));
    }
  }, [isLoadingCancelFriendRequest]);

  useEffect(() => {
    if (isLoadingAcceptReceivedFriendRequest) return;
    if (acceptReceivedFriendRequestError)
      return showToast({ message: acceptReceivedFriendRequestError });
    if (acceptReceivedFriendRequestSuccess) {
      dispatch(triggerGetFriends(user?.uid));
    }
  }, [isLoadingAcceptReceivedFriendRequest]);

  useEffect(() => {
    if (isLoadingRejectReceivedFriendRequest) return;
    if (rejectReceivedFriendRequestError)
      return showToast({ message: rejectReceivedFriendRequestError });
    if (rejectReceivedFriendRequestSuccess) {
      dispatch(triggerGetFriends(user?.uid));
    }
  }, [isLoadingRejectReceivedFriendRequest]);

  const updateFriendStatus = () => {
    if (item != null) {
      const releventFriend = allUsers?.filter((el) => {
        return el.id == item?.id;
      });
      const friend = releventFriend[0]?.data()?.friends?.filter((el) => {
        return el.id == uid;
      });
      if (friend != null && friend?.length > 0) {
        if (friend[0].status == 'received_requests') {
          setFriendStatus('sent_requests');
        } else if (friend[0].status == 'sent_requests') {
          setFriendStatus('received_requests');
        } else {
          setFriendStatus(friend[0].status);
        }
      } else {
        setFriendStatus(null);
      }
    }
  };

  const renderPreviousChatsButton = () => {
    if (frienStatus == 'accepted') {
      return (
        <View style={styles.previousChatButtonContainer}>
          <TouchableOpacity style={styles.previousChatButtonInnerContainer}>
            <Image source={ADD_FRIEND} style={styles.infoButtonIcon} />
            <Text style={styles.previousChatButtonTitle}>Friends</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (frienStatus == 'received_requests') {
      return (
        <View style={styles.previousChatButtonContainer}>
          <TouchableOpacity
            style={styles.previousChatButtonInnerContainer}
            onPress={() => dispatch(triggerAcceptReceivedFriendRequest({ item, uid: user?.uid }))}
          >
            <Image source={ADD_FRIEND} style={styles.infoButtonIcon} />
            <Text style={styles.previousChatButtonTitle}>Accept</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (frienStatus == 'sent_requests') {
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
          <TouchableOpacity
            style={styles.previousChatButtonInnerContainer}
            onPress={() => dispatch(triggerSendFriendRequest({ item, uid: user?.uid }))}
          >
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
      <Loader
        isVisible={
          isLoadingGetFriends ||
          isLoadingSendFriendRequest ||
          isLoadingCancelFriendRequest ||
          isLoadingAcceptReceivedFriendRequest ||
          isLoadingRejectReceivedFriendRequest
        }
      />
    </SafeAreaView>
  );
};
