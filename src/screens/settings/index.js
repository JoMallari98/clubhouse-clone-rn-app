import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { AppBar, ToggleButton, BarButton } from '../../components';
import {
  selectChatRoomType,
  selectCommuteTypes,
  selectPoolSizes,
} from '../../redux/settings/settingsSlice';

import styles from './styles';
import { PRESET } from '../../constants';

export const SettingsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { chatRoomTypes, commuteTypes, poolSizes, isValid } = useSelector(
    (state) => state.settings
  );

  console.log('chat room types : received : ', chatRoomTypes);

  const chatRoomType = () => {
    return (
      <View style={[styles.sectionContainer, styles.chatRoomContainer]}>
        <Text style={styles.sectionTitle}>Chat Room Type</Text>
        <View style={styles.toggleContainer}>
          {chatRoomTypes?.map((item, index) => (
            <ToggleButton
              key={index}
              id={item.id}
              title={item.name}
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
              title={item.name}
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
              title={item.name}
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
      <AppBar />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            {chatRoomType()}
            {commuteType()}
            {poolSize()}
          </View>
          <View style={styles.bottomContainer}>
            <BarButton
              style={styles.findARoom}
              preset={PRESET.PRIMARY}
              size={58}
              title="Find a Room"
              isDisabled={!isValid}
              onPress={() => {
                navigation.navigate('Searching');
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
