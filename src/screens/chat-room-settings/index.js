import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import {
  AppBar,
  ToggleButton,
  BarButton,
  Loader,
  OneOnOneConfirmation,
  showToast,
} from '../../components';
import {
  selectChatRoomType,
  selectCommuteTypes,
  selectPoolSizes,
  triggerGetGlobalSettings,
  triggerGetUserChatSettings,
  triggerUpdateUserChatSettings,
} from '../../redux/settings/settingsSlice';

import styles from './styles';
import { PRESET } from '../../constants';

export const ChatRoomSettingsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    chatRoomTypes,
    commuteTypes,
    poolSizes,
    isValid,
    isLoading,
    isLoadingGetUserChatSettings,
    defaultChatRoomSettings,
    isLoadingUpdateUserChatSettings,
    updateUserChatSettingsError,
  } = useSelector((state) => state.settings);
  const { user, profileUser } = useSelector((state) => state.general);
  const [isVisibleOneOnOneConfirmation, setIsVisibleOneOnOneConfirmation] = useState(false);

  useEffect(() => {
    dispatch(triggerGetGlobalSettings(user?.uid ?? null));
  }, []);

  useEffect(() => {
    if (chatRoomTypes && chatRoomTypes.length > 0) {
      dispatch(triggerGetUserChatSettings());
    }
  }, [chatRoomTypes]);

  useEffect(() => {
    if (isLoadingUpdateUserChatSettings) return;
    if (updateUserChatSettingsError) showToast(updateUserChatSettingsError);
    if (defaultChatRoomSettings && isValid) {
      navigation.navigate('Searching');
    }
  }, [isLoadingUpdateUserChatSettings]);

  const onTapFindARoom = () => {
    if (defaultChatRoomSettings.selectedChatRoomType == 3) {
      setIsVisibleOneOnOneConfirmation(true);
    } else {
      dispatch(
        triggerUpdateUserChatSettings({
          chatSettings: {
            ...defaultChatRoomSettings,
            oneOnOneSelection: null,
          },
          uid: user?.uid ?? null,
        })
      );
      navigation.navigate('Searching');
    }
  };

  const chatRoomType = () => {
    return (
      <View style={[styles.sectionContainer, styles.chatRoomContainer]}>
        <Text style={styles.sectionTitle}>Chat Room Type</Text>
        <View style={styles.toggleContainer}>
          {chatRoomTypes?.map((item, index) => (
            <ToggleButton
              key={index}
              id={item.id}
              title={item.value}
              style={index == 0 ? styles.advertizedToggleButton : styles.toggleButton}
              isSelected={item.id == defaultChatRoomSettings?.selectedChatRoomType}
              onPress={(id) => {
                dispatch(selectChatRoomType(id));
              }}
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
              title={item.value}
              style={styles.toggleButton}
              isSelected={item.id == defaultChatRoomSettings?.selectedEstCommuteType}
              onPress={
                (id) => dispatch(selectCommuteTypes(id))
                // dispatch(
                //   triggerUpdateUserChatSettings({
                //     ...defaultChatRoomSettings,
                //     selectedEstCommuteType: id,
                //   })
                // )
              }
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
              title={item.value}
              style={styles.toggleButton}
              isSelected={item.id == defaultChatRoomSettings?.selectedPreferredPoolSize}
              onPress={
                (id) => dispatch(selectPoolSizes(id))
                // dispatch(
                //   triggerUpdateUserChatSettings({
                //     ...defaultChatRoomSettings,
                //     selectedPreferredPoolSize: id,
                //   })
                // )
              }
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
              onPress={onTapFindARoom}
            />
          </View>
          <Loader isVisible={isLoading || isLoadingGetUserChatSettings} />
          <OneOnOneConfirmation
            isVisible={isVisibleOneOnOneConfirmation}
            data={{
              title: 'I want a',
              onTap: (selection) => {
                setIsVisibleOneOnOneConfirmation(false);
                dispatch(
                  triggerUpdateUserChatSettings({
                    ...defaultChatRoomSettings,
                    oneOnOneSelection: selection,
                  })
                );
                //navigation.navigate('Searching');
              },
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
