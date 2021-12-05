import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Loader, showToast } from '../../components';
import { ChatRoomListItem } from '../../components/chat-room-list-item';
import { triggerGetPreviousChatRooms, triggerRejoinRoom } from '../../redux/rooms/roomsSlice';

import styles from './styles';

const DATA = [
  {
    id: 1,
    name: 'Room Name A',
    date: '21.10.2021 - 8:49PM',
    imageUrl:
      'https://firebasestorage.googleapis.com:443/v0/b/trip-n-44337.appspot.com/o/BnXBOJLEyfP5tfEwKBMaNhZEn1h1.jpg?alt=media&token=f76a4a66-fdde-4942-b486-00353b807f2e',
  },
  {
    id: 2,
    name: 'Room Name B',
    date: '21.10.2021 - 8:49PM',
    imageUrl:
      'https://firebasestorage.googleapis.com:443/v0/b/trip-n-44337.appspot.com/o/BnXBOJLEyfP5tfEwKBMaNhZEn1h1.jpg?alt=media&token=f76a4a66-fdde-4942-b486-00353b807f2e',
  },
  {
    id: 3,
    name: 'Room Name C',
    date: '21.10.2021 - 8:49PM',
    imageUrl:
      'https://firebasestorage.googleapis.com:443/v0/b/trip-n-44337.appspot.com/o/BnXBOJLEyfP5tfEwKBMaNhZEn1h1.jpg?alt=media&token=f76a4a66-fdde-4942-b486-00353b807f2e',
  },
  {
    id: 4,
    name: 'Room Name D',
    date: '21.10.2021 - 8:49PM',
    imageUrl:
      'https://firebasestorage.googleapis.com:443/v0/b/trip-n-44337.appspot.com/o/BnXBOJLEyfP5tfEwKBMaNhZEn1h1.jpg?alt=media&token=f76a4a66-fdde-4942-b486-00353b807f2e',
  },
  {
    id: 5,
    name: 'Room Name E',
    date: '21.10.2021 - 8:49PM',
    imageUrl:
      'https://firebasestorage.googleapis.com:443/v0/b/trip-n-44337.appspot.com/o/BnXBOJLEyfP5tfEwKBMaNhZEn1h1.jpg?alt=media&token=f76a4a66-fdde-4942-b486-00353b807f2e',
  },
];

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
  const { defaultChatRoomSettings } = useSelector((state) => state.settings);
  useEffect(() => {
    console.log('user user user : ', user);
    dispatch(triggerGetPreviousChatRooms({ uid: user?.uid }));
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
