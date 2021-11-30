import { useNavigation } from '@react-navigation/core';
import { StackActions } from '@react-navigation/routers';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, SafeAreaView, StatusBar, ScrollView, Image } from 'react-native';
import { AppBar, ToggleButton, BarButton, LinkButton, Participant } from '../../components';
import LottieView from 'lottie-react-native';

import styles from './styles';
import { PRESET } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { w } from '../../theme';

const PROFILE_ICON = require('../../../assets/profile.png');

export const RoomScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { poolSizes, defaultChatRoomSettings } = useSelector((state) => state.settings);

  const [muteRoom, setMuteRoom] = useState(false);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const selectedPool = poolSizes.find(
      (x) => x.id === defaultChatRoomSettings.selectedPreferredPoolSize
    );
    if (selectedPool) {
      const list = [{ isMicOn: true, isSpeaking: false, name: 'Adam' }];
      for (let i = 0; i < parseInt(selectedPool.value) - 1; i++) {
        list.push({ isMicOn: true, isSpeaking: false, name: 'Devon' });
      }
      setParticipants(list);
    }
  }, []);

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

  const renderParticipants = () => {
    return (
      <View style={styles().participantsContainer}>
        {participants?.map((item, index) => (
          <Participant
            key={index}
            style={[styles().participant, { ...getStyle(index), marginTop: w(80) * index }]}
            source={PROFILE_ICON}
            data={index == 0 && muteRoom ? { ...item, isMicOn: false } : item}
            onPressMic={() => {}}
            onPress={() => {}}
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
          navigation.popToTop();
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
              navigation.popToTop();
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
    </SafeAreaView>
  );
};
