import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import { TF, LinkButton, BarButton, AppBar } from '../../components';
import { PRESET } from '../../constants';

import styles from './styles';

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar />
      <AppBar />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>{`Forgot\nPassword ?`}</Text>
          <Text style={styles.subtitle}>
            Don’t worry! it happens. Please enter the address associated with your account.
          </Text>
          <TF
            style={styles.emailContainer}
            label="Email"
            initialValue="mail@website.com"
            setText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.bottomContainer}>
          <BarButton
            title="Submit"
            isDisabled={true}
            style={styles.submitButton}
            preset={PRESET.PRIMARY}
            onPress={() => navigation.navigate('ForgotPasswordSubmit')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
