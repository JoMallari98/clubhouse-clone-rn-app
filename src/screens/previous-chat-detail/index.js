import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, ChatRoomDetailAvatar, Loader, RatingModal } from '../../components';
import { ChatRoomListItem } from '../../components/chat-room-list-item';

import styles from './styles';

const DATA = [
  {
    id: 1,
    name: 'Adam',
    username: '@adam',
    rating: '5.0',
    imageUrl:
      'https://firebasestorage.googleapis.com:443/v0/b/trip-n-44337.appspot.com/o/BnXBOJLEyfP5tfEwKBMaNhZEn1h1.jpg?alt=media&token=f76a4a66-fdde-4942-b486-00353b807f2e',
  },
  {
    id: 2,
    name: 'Mevan',
    username: '@mewan',
    rating: '4.8',
    imageUrl:
      'https://firebasestorage.googleapis.com:443/v0/b/trip-n-44337.appspot.com/o/BnXBOJLEyfP5tfEwKBMaNhZEn1h1.jpg?alt=media&token=f76a4a66-fdde-4942-b486-00353b807f2e',
  },
  {
    id: 3,
    name: 'Jegan',
    username: '@jegan',
    rating: '3.9',
    imageUrl:
      'https://firebasestorage.googleapis.com:443/v0/b/trip-n-44337.appspot.com/o/BnXBOJLEyfP5tfEwKBMaNhZEn1h1.jpg?alt=media&token=f76a4a66-fdde-4942-b486-00353b807f2e',
  },
  {
    id: 4,
    name: 'Ricky',
    username: '@ricky',
    rating: '3.4',
    imageUrl:
      'https://firebasestorage.googleapis.com:443/v0/b/trip-n-44337.appspot.com/o/BnXBOJLEyfP5tfEwKBMaNhZEn1h1.jpg?alt=media&token=f76a4a66-fdde-4942-b486-00353b807f2e',
  },
  {
    id: 5,
    name: 'Joy',
    username: '@joy',
    rating: null,
    imageUrl:
      'https://firebasestorage.googleapis.com:443/v0/b/trip-n-44337.appspot.com/o/BnXBOJLEyfP5tfEwKBMaNhZEn1h1.jpg?alt=media&token=f76a4a66-fdde-4942-b486-00353b807f2e',
  },
  {
    id: 6,
    name: 'Butler',
    username: '@butler',
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

  const [isVisibleRatingModal, setIsVisibleRatingModal] = useState(false);
  const [seletedItemForRating, setSelectedItemForRating] = useState(null);

  const renderChatRoomItem = ({ item }) => {
    console.log('item ___________>>>', item);
    return (
      <ChatRoomDetailAvatar
        item={item}
        onPressImage={(item) => {
          setSelectedItemForRating(item);
          setIsVisibleRatingModal(true);
          //navigation.navigate('ThirdPartyProfile', { item, uid: user?.uid });
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar />
      <AppBar title={item?.name ?? 'Room Name'} />
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
      <RatingModal
        isVisible={isVisibleRatingModal}
        onTapClose={() => setIsVisibleRatingModal(false)}
        onTapRate={({ item, rating }) => {
          setIsVisibleRatingModal(false);
        }}
        onTapReport={(item) => {
          setIsVisibleRatingModal(false);
          navigation.navigate('ReportProfile', { profile: null, uid: null });
        }}
        item={seletedItemForRating}
      />
    </SafeAreaView>
  );
};
