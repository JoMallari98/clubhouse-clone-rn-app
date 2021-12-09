import { useNavigation, useRoute } from '@react-navigation/core';
import { StackActions } from '@react-navigation/routers';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, SafeAreaView, StatusBar, ScrollView, Image, BackHandler } from 'react-native';
import {
  AppBar,
  ToggleButton,
  BarButton,
  LinkButton,
  Participant,
  ConfirmationMessage,
  Loader,
  showToast,
} from '../../components';
import LottieView from 'lottie-react-native';

import styles from './styles';
import { PRESET } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { w } from '../../theme';
import RtcEngine from 'react-native-agora';
import { AgoraConfig } from '../../config/agora-config';
import { join } from '@redux-saga/core/effects';
import {
  triggerLeaveRoom,
  triggerResetRoom,
  triggerUpdateMicStatus,
} from '../../redux/rooms/roomsSlice';
import firestore from '@react-native-firebase/firestore';

const PROFILE_ICON = require('../../../assets/profile.png');

export const RoomScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const route = useRoute();

  const { poolSizes, defaultChatRoomSettings } = useSelector((state) => state.settings);
  const { profileUser } = useSelector((state) => state.general);
  const { allUsers } = useSelector((state) => state.friends);
  const {
    isLoadingFindRoom,
    room,
    roomId,
    roomSize,
    isLoadingLeaveRoom,
    leaveRoomError,
    leaveRoomSuccess,
  } = useSelector((state) => state.rooms);

  const [muteRoom, setMuteRoom] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [engine, setEngine] = useState();
  const [joinSucceed, setJoinSucceed] = useState(false);
  const [peerIds, setPeerIds] = useState([]);
  const [isVisibleLeaveConfirmatinMessage, setIsVisibleLeaveConfirmationMessage] = useState(false);
  const [isVisibleLoader, setIsVisibleLoader] = useState(false);

  const initAgora = async () => {
    const _engine = await RtcEngine.create(AgoraConfig.appId);
    setEngine(_engine);
    await _engine.enableAudio();

    // Listen for the UserJoined callback.
    // This callback occurs when the remote user successfully joins the channel.
    _engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      if (peerIds.indexOf(uid) === -1) {
        setPeerIds([...peerIds, uid]);
      }
    });

    // Listen for the UserOffline callback.
    // This callback occurs when the remote user leaves the channel or drops offline.
    _engine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      setPeerIds(peerIds.filter((id) => id !== uid));
    });

    // Listen for the JoinChannelSuccess callback.
    // This callback occurs when the local user successfully joins the channel.
    _engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed);
      setJoinSucceed(true);
    });

    await joinChannel(_engine);
  };

  const joinChannel = async (_engine) => {
    await _engine?.joinChannel(
      '006a7dbe5e4d7574145b90146011fca9599IADBY4OxEzY4lUYCazl6WEzAZzZ/54PbhmzcFq5ulLN3l1Q8SVUAAAAAEAAUEHcdTDWyYQEAAQBMNbJh',
      'test-audio',
      null,
      0
    );
  };

  const onTapSpeakerChange = (data, status) => {
    engine
      ?.enableLocalAudio(status)
      .then(() => {
        dispatch(triggerUpdateMicStatus({ room, roomId, uid: profileUser?.id, status: !status }));
      })
      .catch((err) => {
        console.warn('enableLocalAudio', err);
      });
  };

  useEffect(() => {
    initAgora();
    setParticipants(getReOrderedParticipants(room?.participants) ?? []);
    // const selectedPool = poolSizes.find(
    //   (x) => x.id === defaultChatRoomSettings.selectedPreferredPoolSize
    // );

    // if (selectedPool) {
    //   const list = [{ isMicOn: true, isSpeaking: false, name: 'Adam' }];
    //   for (let i = 0; i < parseInt(selectedPool.value) - 1; i++) {
    //     list.push({ isMicOn: true, isSpeaking: false, name: 'Devon' });
    //   }
    //   setParticipants(list);
    // }
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('rooms')
      .doc(roomId)
      .onSnapshot((documentSnapshot) => {
        console.log('room data >>>>>>>>>>>>>>>>>>>++++', documentSnapshot?.data());
        setParticipants(getReOrderedParticipants(documentSnapshot?.data()?.participants));
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  useEffect(() => {
    if (isLoadingLeaveRoom) return;
    if (leaveRoomError) return showToast(leaveRoomError);
    if (leaveRoomSuccess) {
      dispatch(triggerResetRoom());
      return navigation.popToTop();
    }
  }, [isLoadingLeaveRoom]);

  const getStyle = (index) => {
    if (index == 0) {
      return styles().middleParticipant;
    }
    if (index % 2 == 0) {
      if ((index + 1) % 3 == 0) {
        return styles(true).rightParticipant;
      } else {
        return styles().rightParticipant;
      }
    } else {
      if ((index + 1) % 3 == 0) {
        return styles(true).leftParticipant;
      } else {
        return styles().leftParticipant;
      }
    }
  };

  const getReOrderedParticipants = (list) => {
    const orderedList = [
      ...(list?.filter((el) => el.id == profileUser.id) ?? []),
      ...(list?.filter((el) => el.id != profileUser.id) ?? []),
    ];
    const generatedList = [];

    orderedList.forEach((element) => {
      if (element?.isLeft == undefined || element?.isLeft == null || element?.isLeft != true) {
        const filteredUser = allUsers?.filter((el) => el?.data().id == element.id);
        generatedList.push({
          ...element,
          name: (filteredUser[0]?.data()?.fullName?.split(' '))[0],
          imageUrl: filteredUser[0]?.data()?.imageUrl,
        });
      }
    });
    return generatedList;
  };

  const leaveChannel = async () => {
    await engine?.leaveChannel();
    setPeerIds([]);
    setJoinSucceed(false);
  };

  const requestToLeaveChatRoom = async () => {
    setIsVisibleLoader(true);
    await leaveChannel();
    setIsVisibleLoader(false);
    dispatch(triggerLeaveRoom({ roomId, uid: profileUser?.id }));
  };

  const renderParticipants = () => {
    return (
      <View style={styles().participantsContainer}>
        {participants?.map((item, index) => (
          <Participant
            key={index}
            style={[styles().participant, { ...getStyle(index), marginTop: w(80) * index }]}
            source={PROFILE_ICON}
            item={item}
            isCurrentUser={item.id == profileUser.id}
            isDisabled={item.id != profileUser.id}
            onPress={(data, status) => {
              onTapSpeakerChange(data, status);
            }}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles().screen}>
      <StatusBar />
      <AppBar
        title="Room Name"
        onPressLeftIcon={() => {
          setIsVisibleLeaveConfirmationMessage(true);
          //navigation.popToTop();
        }}
      />
      <View style={styles().scrollContainer}>
        <ScrollView contentContainerStyle={styles().scrollView} scrollEnabled={true}>
          <View style={styles(false, participants?.length * w(90)).container}>
            <View style={styles().topContainer}>{renderParticipants()}</View>
          </View>
        </ScrollView>
      </View>

      <View style={styles().bottomContainer}>
        <View style={styles().leaveRoomContainer}>
          <BarButton
            style={styles().leaveRoom}
            preset={PRESET.INFO}
            size={58}
            title="Leave Room"
            isDisabled={false}
            onPress={() => {
              setIsVisibleLeaveConfirmationMessage(true);
              //navigation.popToTop();
            }}
          />
        </View>
        {/*<View style={styles().tapToMuteContainer}>
          <LinkButton
            title={muteRoom ? 'Tap to Unmute' : 'Tap to Mute'}
            style={styles().tapToMute}
            titleStyle={styles().tapToMuteTitle}
            preset={PRESET.SUCCESS}
            onPress={() => {
              setMuteRoom(!muteRoom);
            }}
          />
          </View>*/}
      </View>
      <ConfirmationMessage
        isVisible={isVisibleLeaveConfirmatinMessage}
        title="WARNING!"
        detail="Are you sure? do you really want to leave this chat room?"
        onTapNegative={() => {
          setIsVisibleLeaveConfirmationMessage(false);
        }}
        onTapPositive={() => {
          setIsVisibleLeaveConfirmationMessage(false);
          requestToLeaveChatRoom();
        }}
      />
      <Loader isVisible={isVisibleLoader} />
    </SafeAreaView>
  );
};
