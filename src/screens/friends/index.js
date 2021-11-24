import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Avatar,
  FriendListItem,
  FriendRequestListItem,
  GradientBarButton,
  Loader,
  showToast,
} from '../../components';
import { DualTabButton } from '../../components/dual-tab-button';
import {
  triggerGetFriends,
  triggerSendFriendRequest,
  triggerCancelFriendRequest,
  triggerAcceptReceivedFriendRequest,
  triggerRejectReceivedFriendRequest,
} from '../../redux/friends/friendsSlice';

import styles from './styles';

export const FriendsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { user } = useSelector((state) => state.general);
  const {
    friends,
    suggestedFriends,
    receivedFriendRequests,
    isLoadingGetFriends,
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

  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    dispatch(triggerGetFriends(user?.uid));
  }, []);

  useEffect(() => {
    if (isLoadingGetFriends) return;
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

  const renderFriendRequestList = () => {
    return (
      <View style={styles.friendListContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={receivedFriendRequests}
          renderItem={renderFriendRequestListItem}
          keyExtractor={(item) => item?.id}
        />
      </View>
    );
  };

  const renderFriendRequestListItem = ({ item }) => {
    return (
      <FriendRequestListItem
        item={item}
        onTap={(item) => {
          navigation.navigate('ThirdPartyProfile', { item, uid: user?.uid });
        }}
        onTapAccept={(item) => {
          dispatch(triggerAcceptReceivedFriendRequest({ item, uid: user?.uid }));
        }}
        onTapReject={(item) => {
          dispatch(triggerRejectReceivedFriendRequest({ item, uid: user?.uid }));
        }}
      />
    );
  };

  const renderFriendList = () => {
    return (
      <View style={styles.friendListContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={suggestedFriends}
          renderItem={renderFriendListItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  const renderFriendListItem = ({ item }) => {
    if (item.isPendingRequest) {
      return (
        <FriendRequestListItem
          item={item}
          onTapAcceptTitle="Pending"
          isDisableAcceptBtn={true}
          onTap={(item) => {
            navigation.navigate('ThirdPartyProfile', { item, uid: user?.uid });
          }}
          onTapAccept={(item) => {}}
          onTapReject={(item) => {
            dispatch(triggerCancelFriendRequest({ item, uid: user?.uid }));
          }}
        />
      );
    } else {
      return (
        <FriendListItem
          item={item}
          onTap={(item) => {
            navigation.navigate('ThirdPartyProfile', { item, uid: user?.uid });
          }}
          onTapChat={(item) => {
            dispatch(triggerSendFriendRequest({ item, uid: user?.uid }));
          }}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar />
      <AppBar title={selectedIndex == 0 ? 'Friends' : 'Requests'} />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          {selectedIndex == 0 ? renderFriendList() : renderFriendRequestList()}
        </View>
        <View style={styles.bottomContainer}>
          <DualTabButton onPress={(id) => setSelectedIndex(id)} />
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
