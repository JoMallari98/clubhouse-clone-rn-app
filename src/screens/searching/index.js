import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { AppBar, ToggleButton, BarButton, showToast } from '../../components';
import LottieView from 'lottie-react-native';
import firestore from '@react-native-firebase/firestore';

import styles from './styles';
import { PRESET } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { w } from '../../theme';
import { triggerFindRoom, triggerUpdateRoomStatus } from '../../redux/rooms/roomsSlice';

const SEARCH_ANIMATION = require('../../../assets/animation/searching.json');

export const SearchingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //const searchButtonRef = useRef();

  const { defaultChatRoomSettings, poolSizes } = useSelector((state) => state.settings);
  const { profileUser } = useSelector((state) => state.general);
  const {
    isLoadingFindRoom,
    room,
    roomId,
    roomSize,
    findRoomError,
    isLoadingUpdateRoomStatus,
    updateRoomStatusError,
  } = useSelector((state) => state.rooms);

  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [roomStatus, setRoomStatus] = useState('PENDING');
  const [snapshotData, setSnapshotData] = useState(null);

  useEffect(() => {
    // setTimeout(() => {
    //   navigation.navigate('Room');
    // }, 2000);
    findARoom();
    requestCameraAndAudioPermission();
  }, []);

  useEffect(() => {
    if (isLoadingFindRoom) return;
    if (findRoomError) return showToast(findRoomError);
    if (room && roomId) {
      // TODO: CREATE LISTENER
      setSelectedRoomId(roomId);
      console.log('received room : : : ', room);
      if (room?.participants != null && room?.participants?.length == roomSize) {
        console.log('received room : : : if ');
        //navigation.navigate('Room')
        setRoomStatus('LIVE');
        updateChatRoomStatus();
        console.log('received room : : : if else');
      }
    }
  }, [isLoadingFindRoom]);

  useEffect(() => {
    console.log('selected room id : ', selectedRoomId);
    //if (selectedRoomId == null) return;
    const subscriber = firestore()
      .collection('rooms')
      .doc(selectedRoomId)
      .onSnapshot((documentSnapshot) => {
        setSnapshotData(documentSnapshot);
      });

    // Stop listening for updates when no longer required
    //return () => subscriber();
  }, [selectedRoomId]);

  useEffect(() => {
    if (snapshotData) {
      console.log('Room Data: 1', snapshotData.data());
      if (selectedRoomId) {
        console.log('Room Data: 2', snapshotData.data());
        const { chatRoomStatus } = snapshotData?.data() ?? {};
        if (chatRoomStatus == 'LIVE' && snapshotData?.data()?.participants?.length == roomSize) {
          console.log('Room Data: 3', snapshotData.data());
          navigation.navigate('Room');
        }
      }
    }
  }, [snapshotData]);

  useEffect(() => {
    if (isLoadingUpdateRoomStatus) return;
    if (updateRoomStatusError) return showToast(updateRoomStatusError);
    // searchButtonRef.current.handleOnPress()
    // console.log(searchButtonRef)
    // console.log(searchButtonRef?.current?.focus())
  }, [isLoadingUpdateRoomStatus]);

  async function updateChatRoomStatus() {
    setTimeout(() => {
      dispatch(triggerUpdateRoomStatus({ room, roomId, status: 'LIVE' }));
    }, 1000);
  }

  const requestCameraAndAudioPermission = async () => {
    if (Platform.OS == 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
        if (granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the mic');
        } else {
          console.log('Permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

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
