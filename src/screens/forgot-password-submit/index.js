import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image } from 'react-native';
import { TF, LinkButton, BarButton, AppBar } from '../../components';
import { PRESET } from '../../constants';

import styles from './styles';

const mail = require('../../../assets/mail.png');

export const ForgotPasswordSubmitScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar />
      <AppBar />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image style={styles.icon} source={mail} />
          <Text style={styles.title}>{`Check\nyour email`}</Text>
          <Text style={styles.subtitle}>
            We have sent a password recover instructions to your email
          </Text>
          <BarButton
            title="Open Email App"
            isDisabled={false}
            style={styles.submitButton}
            preset={PRESET.PRIMARY}
            onPress={() => {}}
            size={48}
          />
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.didNotReceiveEmail}>Didn’t receive the email? Check your </Text>
          <View style={styles.didNotReceiveEmailContainer}>
            <Text style={styles.didNotReceiveEmail}>spam filter, or </Text>
            <LinkButton
              title="Resend!"
              style={styles.resendTitle}
              preset={PRESET.SUCCESS}
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
