import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BarButton, AppBar, Avatar, Message, Loader, showToast } from '../../components';
import { PRESET } from '../../constants';
import {
  triggerGetGlobalSettings,
  triggerGetUserChatSettings,
} from '../../redux/settings/settingsSlice';
import { triggerGetFriends } from '../../redux/friends/friendsSlice';

import styles from './styles';

const FRIENDS_ICON = require('../../../assets/friends.png');
const SETTINGS_ICON = require('../../../assets/preset_settings.png');
const PROFILE_ICON = require('../../../assets/profile.png');

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { user, profileUser } = useSelector((state) => state.general);
  const { defaultChatRoomSettings, isLoadingGetUserChatSettings, getUserChatSettingsError } =
    useSelector((state) => state.settings);

  const [isVisibleStopWhileDriving, setIsVisibleStopWhileDriving] = useState(false);

  useEffect(() => {
    dispatch(triggerGetUserChatSettings(user?.uid ?? null));
    dispatch(triggerGetFriends(user?.uid));
    dispatch(triggerGetGlobalSettings(user?.uid ?? null));
  }, []);

  useEffect(() => {
    if (isLoadingGetUserChatSettings) return;
    if (getUserChatSettingsError) return showToast({ message: getUserChatSettingsError });
  }, [isLoadingGetUserChatSettings]);

  const onTapFriends = () => {
    navigation.navigate('Friends');
  };

  const onTapSettings = () => {
    navigation.navigate('ChatRoomSettings');
  };

  const onTapStart = () => {
    setIsVisibleStopWhileDriving(true);
  };

  const onTapStartConfirmation = () => {
    setIsVisibleStopWhileDriving(false);
    console.log('default chat room settings  ', defaultChatRoomSettings);
    if (
      defaultChatRoomSettings != null &&
      defaultChatRoomSettings?.selectedChatRoomType != null &&
      defaultChatRoomSettings?.selectedEstCommuteType != null &&
      defaultChatRoomSettings?.selectedPreferredPoolSize != null
    ) {
      navigation.navigate('Searching');
    } else {
      navigation.navigate('ChatRoomSettings');
    }
  };

  const richTitle = () => {
    return (
      <View style={styles.titleContainer}>
        <Text style={[styles.title, styles.tripTitle]}>TRIP&apos;N</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar />
      <AppBar
        richTitle={richTitle}
        leftIcon={FRIENDS_ICON}
        onPressLeftIcon={() => {
          onTapFriends();
        }}
        leftIconStyles={styles.appBarIcon}
        rightIcon={SETTINGS_ICON}
        onPressRightIcon={() => {
          onTapSettings();
        }}
        rightIconStyles={styles.appBarIcon}
      />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Avatar
            style={styles.avatar}
            source={profileUser?.imageUrl ? { uri: profileUser?.imageUrl } : PROFILE_ICON}
            size={120}
            onPress={() => navigation.navigate('AccountNavigator')}
          />

          <Text style={styles.hello}>{profileUser?.fullName ?? 'USER NAME'}</Text>
          <Text style={styles.welcome}>Welcome back!</Text>

          <BarButton
            style={styles.start}
            size={56}
            title="Start"
            isDisabled={false}
            preset={PRESET.SUCCESS}
            onPress={() => {
              onTapStart();
            }}
          />
        </View>
        {/*<View style={styles.bottomContainer}>
          <BarButton
            style={styles.startALobby}
            title="Start a Lobby"
            isDisabled={false}
            preset={PRESET.PRIMARY}
            prefixIcon={PLUS_ICON}
            onPress={() => navigation.navigate('StartALobby')}
          />
          </View>*/}
      </View>
      <Message
        isVisible={isVisibleStopWhileDriving}
        data={{
          title: 'STOP!',
          detail: 'Do not use while driving',
          onTap: onTapStartConfirmation,
        }}
      />
      <Loader isVisible={isLoadingGetUserChatSettings} />
    </SafeAreaView>
  );
};
