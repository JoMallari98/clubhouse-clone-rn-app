import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { AppBar, ToggleButton, BarButton } from '../../components';
import {
  selectChatRoomType,
  selectCommuteTypes,
  selectPoolSizes,
} from '../../redux/startALobby/startALobbySlice';

import styles from './styles';
import { PRESET } from '../../constants';
import { TextInput } from 'react-native-gesture-handler';

export const StartALobbyScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { chatRoomTypes, commuteTypes, poolSizes, isValid } = useSelector(
    (state) => state.startALobby
  );

  const [lobbyName, setLobbyName] = useState('');

  const renderLobbyName = () => {
    return (
      <View style={[styles.sectionContainer, styles.lobbyNameContainer]}>
        <Text style={styles.sectionTitle}>Lobby Name</Text>
        <View style={styles.lobbyInputContainer}>
          <TextInput
            style={styles.lobbyNameInput}
            textAlign="center"
            placeholder="Lobby Name"
            onChangeText={(text) => {
              setLobbyName(text);
            }}
            autoCapitalize="characters"
          />
        </View>
      </View>
    );
  };

  const chatRoomType = () => {
    return (
      <View style={[styles.sectionContainer, styles.chatRoomContainer]}>
        <Text style={styles.sectionTitle}>Chat Room Type</Text>
        <View style={styles.toggleContainer}>
          {chatRoomTypes.map((item, index) => (
            <ToggleButton
              key={index}
              id={item.id}
              title={item?.name}
              style={index == 0 ? styles.advertizedToggleButton : styles.toggleButton}
              isSelected={item.isSelected}
              onPress={(id) => dispatch(selectChatRoomType(id))}
              size={index == 0 ? 57 : 38}
            />
          ))}
        </View>
      </View>
    );
  };

  const commuteType = () => {
    return (
      <View style={[styles.sectionContainer, styles.commuteTypeContainer]}>
        <Text style={styles.sectionTitle}>Commute Time</Text>
        <View style={styles.toggleContainer}>
          {commuteTypes.map((item, index) => (
            <ToggleButton
              key={index}
              id={item.id}
              title={item?.name}
              style={styles.toggleButton}
              isSelected={item.isSelected}
              onPress={(id) => dispatch(selectCommuteTypes(id))}
            />
          ))}
        </View>
      </View>
    );
  };

  const poolSize = () => {
    return (
      <View style={[styles.sectionContainer, styles.poolSizeContainer]}>
        <Text style={styles.sectionTitle}>Pool Size</Text>
        <View style={styles.toggleContainer}>
          {poolSizes.map((item, index) => (
            <ToggleButton
              key={index}
              id={item.id}
              title={item?.name}
              style={styles.toggleButton}
              isSelected={item.isSelected}
              onPress={(id) => dispatch(selectPoolSizes(id))}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar />
      <AppBar title="Start a Lobby" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            {/*renderLobbyName()*/}
            {chatRoomType()}
            {commuteType()}
            {poolSize()}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <BarButton
          style={styles.findARoom}
          preset={PRESET.PRIMARY}
          size={58}
          title="Create a Room"
          isDisabled={!isValid}
          onPress={() => {
            navigation.navigate('Searching');
          }}
        />
      </View>
    </SafeAreaView>
  );
};
