import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, SafeAreaView, StatusBar, ScrollView, Image } from 'react-native';
import { AppBar, ToggleButton, BarButton, showToast } from '../../components';
import LottieView from 'lottie-react-native';
import firestore from '@react-native-firebase/firestore';

import styles from './styles';
import { PRESET } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { w } from '../../theme';
import { triggerFindRoom } from '../../redux/rooms/roomsSlice';

const SEARCH_ANIMATION = require('../../../assets/animation/searching.json');

export const SearchingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { defaultChatRoomSettings, poolSizes } = useSelector((state) => state.settings);
  const { profileUser } = useSelector((state) => state.general);
  const { isLoadingFindRoom, room, roomId, roomSize, findRoomError } = useSelector(
    (state) => state.rooms
  );

  const [selectedRoomId, setSelectedRoomId] = useState(null);

  useEffect(() => {
    // setTimeout(() => {
    //   navigation.navigate('Room');
    // }, 2000);
    findARoom();
  }, []);

  useEffect(() => {
    if (isLoadingFindRoom) return;
    if (findRoomError) return showToast(findRoomError);
    if (room && roomId) {
      // TODO: CREATE LISTENER
      setSelectedRoomId(roomId);
    }
  }, [isLoadingFindRoom]);

  useEffect(() => {
    console.log('selected room id : ', selectedRoomId);
    const subscriber = firestore()
      .collection('rooms')
      .doc(selectedRoomId)
      .onSnapshot((documentSnapshot) => {
        console.log('Room Data: ', documentSnapshot.data());
        const { participants } = documentSnapshot.data();
        if (
          participants != null &&
          participants?.length == roomSize &&
          participants[participants.length - 1]?.id == profileUser?.id
        ) {
          //CONNECT TO CHAT ROOM WITH AGORA
          console.log('CONNECT TO CHAT ROOM WITH AGORA');
        } else {
          console.log('CHAT ROOM SHOULD FILL');
        }
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [selectedRoomId]);

  const findARoom = () => {
    console.log('default chat room settings : ', defaultChatRoomSettings);
    dispatch(triggerFindRoom({ settings: defaultChatRoomSettings, user: profileUser }));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar />
      <AppBar title="Searching" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <TouchableOpacity>
              <LottieView
                source={SEARCH_ANIMATION}
                autoPlay
                loop
                style={{
                  width: w(200),
                  height: w(200),
                }}
              />
            </TouchableOpacity>
            <Text style={styles.searchingForRoom}>Searching for room...</Text>
          </View>
          <View style={styles.bottomContainer}>
            <BarButton
              style={styles.cancel}
              preset={PRESET.INFO}
              size={58}
              title="Cancel"
              isDisabled={false}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
