import { useNavigation, useRoute } from '@react-navigation/core';
import React from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, ChatRoomDetailAvatar, Loader } from '../../components';
import { ChatRoomListItem } from '../../components/chat-room-list-item';

import styles from './styles';

const DATA = [
  {
    id: 1,
    name: 'Adam',
    rating: '5.0',
    imageUrl:
      'https://firebasestorage.googleapis.com:443/v0/b/trip-n-44337.appspot.com/o/BnXBOJLEyfP5tfEwKBMaNhZEn1h1.jpg?alt=media&token=f76a4a66-fdde-4942-b486-00353b807f2e',
    
  },
  {
    id: 2,
    name: 'Mevan',
    rating: '4.8',
    imageUrl:
      'https://firebasestorage.googleapis.com:443/v0/b/trip-n-44337.appspot.com/o/BnXBOJLEyfP5tfEwKBMaNhZEn1h1.jpg?alt=media&token=f76a4a66-fdde-4942-b486-00353b807f2e',
  },
  {
    id: 3,
    name: 'Jegan',
    rating: '3.9',
    imageUrl:
      'https://firebasestorage.googleapis.com:443/v0/b/trip-n-44337.appspot.com/o/BnXBOJLEyfP5tfEwKBMaNhZEn1h1.jpg?alt=media&token=f76a4a66-fdde-4942-b486-00353b807f2e',
  },
  {
    id: 4,
    name: 'Ricky',
    rating: '3.4',
    imageUrl:
      'https://firebasestorage.googleapis.com:443/v0/b/trip-n-44337.appspot.com/o/BnXBOJLEyfP5tfEwKBMaNhZEn1h1.jpg?alt=media&token=f76a4a66-fdde-4942-b486-00353b807f2e',
  },
  {
    id: 5,
    name: 'Joy',
    rating: null,
    imageUrl:
      'https://firebasestorage.googleapis.com:443/v0/b/trip-n-44337.appspot.com/o/BnXBOJLEyfP5tfEwKBMaNhZEn1h1.jpg?alt=media&token=f76a4a66-fdde-4942-b486-00353b807f2e',
  },
  {
    id: 6,
    name: 'Butler',
    rating: '4.3',
    imageUrl:
      'https://firebasestorage.googleapis.com:443/v0/b/trip-n-44337.appspot.com/o/BnXBOJLEyfP5tfEwKBMaNhZEn1h1.jpg?alt=media&token=f76a4a66-fdde-4942-b486-00353b807f2e',
  },
];

export const PreviousChatDetailScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const { item, uid } = route.params;
  const { user } = useSelector((state) => state.general);

  const renderChatRoomItem = ({ item }) => {
    return <ChatRoomDetailAvatar item={item} onPressImage={(item) => {
      navigation.navigate('ThirdPartyProfile', { item, uid: user?.uid });
    }} />;
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar />
      <AppBar title="Room Name" />
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={DATA}
          renderItem={renderChatRoomItem}
          keyExtractor={(item) => item?.id}
          columnWrapperStyle={styles.row}
          numColumns={3}
        />
      </View>
      <Loader />
    </SafeAreaView>
  );
};
