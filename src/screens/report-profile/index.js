import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import { View, SafeAreaView, StatusBar, Text, TextInput } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  BarButton,
  ChatRoomDetailAvatar,
  Loader,
  RatingModal,
  TF,
  ToggleButton,
} from '../../components';
import { ChatRoomListItem } from '../../components/chat-room-list-item';
import { PRESET } from '../../constants';

import styles from './styles';

const REASONS_DATA = [
  {
    id: 1,
    reason: 'Abusive Language',
  },
  {
    id: 2,
    reason: 'Hate Speach',
  },
  {
    id: 3,
    reason: 'Stalking/Threats',
  },
  {
    id: 4,
    reason: 'Bad Connection',
  },
  {
    id: 5,
    reason: 'Bad Audio',
  },
];

export const ReportProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const { profile, uid } = route.params;
  const { user } = useSelector((state) => state.general);

  const [selectedReason, setSelectedReason] = useState(null);
  const [moreDetails, setMoreDetails] = useState();

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar />
      <AppBar title="Report" />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.toggleContainer}>
            {REASONS_DATA.map((item, index) => (
              <ToggleButton
                key={index}
                id={item.id}
                title={item.reason}
                style={styles.toggleButton}
                isSelected={item.id == selectedReason}
                onPress={(id) => setSelectedReason(id)}
              />
            ))}
          </View>

          <Text style={styles.tellUsMoreLabel}>Tell us more</Text>
          <TextInput
            style={styles.textInput}
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => setMoreDetails(text)}
            value={moreDetails}
          />
        </View>

        <View style={styles.bottomContainer}>
          <BarButton
            style={styles.startALobby}
            title="Report"
            isDisabled={false}
            preset={PRESET.PRIMARY}
            onPress={() => {}}
          />
        </View>
      </View>
      <Loader />
    </SafeAreaView>
  );
};
