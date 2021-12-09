import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Loader, showToast } from '../../components';
import { ChatRoomListItem } from '../../components/chat-room-list-item';
import { triggerGetPreviousChatRooms, triggerRejoinRoom } from '../../redux/rooms/roomsSlice';

import styles from './styles';

export const PreviousChatsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { user } = useSelector((state) => state.general);
  const {
    isLoadingGetPreviousChatRooms,
    getPreviousChatRoomsError,
    previousChatRooms,
    isLoadingRejoinRoom,
    rejoinRoomError,
    rejoinRoomData,
  } = useSelector((state) => state.rooms);
  const { allUsers } = useSelector((state) => state.friends);
  const { defaultChatRoomSettings } = useSelector((state) => state.settings);
  useEffect(() => {
    console.log('user user user : ', user);
    dispatch(triggerGetPreviousChatRooms({ uid: user?.uid, allUsers }));
  }, []);

  useEffect(() => {
    if (isLoadingGetPreviousChatRooms) return;
    if (getPreviousChatRoomsError) return showToast(getPreviousChatRoomsError);
  }, [isLoadingGetPreviousChatRooms]);

  useEffect(() => {
    if (isLoadingRejoinRoom) return;
    if (rejoinRoomError) return showToast(rejoinRoomError);
    if (rejoinRoomData) {
      console.log('rejoin room data : ', rejoinRoomData);
      navigation.navigate('Room');
    }
  }, [isLoadingRejoinRoom]);

  const renderChatRoomItem = ({ item }) => {
    console.log('-----------item ', item);
    return (
      <ChatRoomListItem
        item={item}
        onTap={(item) => {
          navigation.navigate('PreviousChatDetail', { item, uid: user?.uid });
        }}
        onTapRejoin={(item) => {
          console.log('*******', item);
          dispatch(
            triggerRejoinRoom({
              roomId: item?.id,
              uid: user?.uid,
              settings: defaultChatRoomSettings,
            })
          );
        }}
      />
    );
  };
  //console.log(previousChatRooms)
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar />
      <AppBar title="Previous Chats" />
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={previousChatRooms}
          renderItem={renderChatRoomItem}
          keyExtractor={(item) => item?.id}
        />
      </View>
      <Loader isVisible={isLoadingGetPreviousChatRooms} />
    </SafeAreaView>
  );
};
