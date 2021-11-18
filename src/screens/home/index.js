import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BarButton, AppBar, Avatar, Message } from '../../components';
import { APP_STATUS, PRESET } from '../../constants';
import { setAppStatus } from '../../redux/general/generalSlice';
import { w } from '../../theme';

import styles from './styles';

const FRIENDS_ICON = require('../../../assets/friends.png');
const SETTINGS_ICON = require('../../../assets/settings.png');
const PROFILE_ICON = require('../../../assets/profile.png');
const PLUS_ICON = require('../../../assets/plus.png');

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { user, appStatus } = useSelector((state) => state.general);
  useEffect(() => {
    console.log('HOME SCREEN USER CHANGED ', user, appStatus);
  }, [user]);

  const [isVisibleStopWhileDriving, setIsVisibleStopWhileDriving] = useState(false);

  const onTapSignOut = () => {
    //dispatch(signOut());
    dispatch(setAppStatus(APP_STATUS.NEW_USER));
  };

  const onTapFriends = () => {
    console.log('on tap friends');
  };

  const onTapSettings = () => {
    console.log('on tap settings');
    navigation.navigate('Settings');
  };

  const onTapStart = () => {
    setIsVisibleStopWhileDriving(true);
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
            source={PROFILE_ICON}
            size={120}
            onPress={() => navigation.navigate('Profile')}
          />

          <Text style={styles.hello}>Hello JohnD</Text>
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
          onTap: () => {
            setIsVisibleStopWhileDriving(false);
            navigation.navigate('Settings');
          },
        }}
      />
    </SafeAreaView>
  );
};
