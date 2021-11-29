import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { AppBar, ConfirmationMessage, Loader, TF, ToggleButton } from '../../components';
import { triggerSignOutSaga } from '../../redux/signIn/signInSlice';
import { triggerResetAuth } from '../../redux/general/generalSlice';

import styles from './styles';

export const SettingsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { user, appStatus, profileUser } = useSelector((state) => state.general);
  const { isSignOutLoading, signOutError, signOutSuccess } = useSelector((state) => state.signIn);

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isVisibleLogoutConfirmation, setIsVisibleLogoutConfirmation] = useState(false);

  useEffect(() => {
    setFullName(profileUser?.fullName);
    setUsername(profileUser?.username);
    setEmail(profileUser?.email);
  }, [profileUser]);

  console.log(isSignOutLoading, signOutSuccess, signOutError);
  useEffect(() => {
    console.log(isSignOutLoading, signOutSuccess, signOutError);
    if (isSignOutLoading) return;
    if (signOutError) return showToast({ message: signOutError });
    console.log('is sign out success ', isSignOutLoading);
    //if ( signOutSuccess) return dispatch(triggerResetAuth())
  }, [isSignOutLoading]);

  const signOut = () => {
    dispatch(triggerSignOutSaga());
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar />
      <AppBar />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <TF
              initialValue={fullName}
              style={styles.emailContainer}
              label="Full Name"
              placeholder="John Do"
              setText={(text) => setFullName(text)}
            />
            <TF
              initialValue={username}
              style={styles.emailContainer}
              label="Username"
              placeholder="@johndo"
              setText={(text) => setUsername(text)}
            />
            <TF
              initialValue={email}
              style={styles.emailContainer}
              label="Email"
              placeholder="johndoe@gmail.com"
              setText={(text) => setEmail(text)}
              keyboardType="email-address"
              editable={false}
            />

            <ToggleButton
              key={0}
              id={'0'}
              title="Change Password"
              onPress={(id) => {}}
              style={styles.toggleButton}
            />

            <ToggleButton
              key={1}
              id={'1'}
              title="Delete Account"
              onPress={(id) => {}}
              style={styles.toggleButton}
            />

            <ToggleButton
              key={2}
              id={'2'}
              title="Logout"
              onPress={(id) => setIsVisibleLogoutConfirmation(true)}
              style={styles.toggleButton}
            />
          </View>
          <View style={styles.bottomContainer}></View>
          <Loader />
        </View>
        <ConfirmationMessage
          isVisible={isVisibleLogoutConfirmation}
          title="WARNING!"
          detail="Are you sure? do you want to logout?"
          onTapNegative={() => {
            setIsVisibleLogoutConfirmation(false);
          }}
          onTapPositive={() => {
            setIsVisibleLogoutConfirmation(false);
            signOut();
          }}
        />
        <Loader isVisible={isSignOutLoading} />
      </ScrollView>
    </SafeAreaView>
  );
};
