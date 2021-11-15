import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme';
import styles from './styles';
import { PRESET } from '../../constants';
import { BarButton, Message } from '../../components';
import { useNavigation } from '@react-navigation/core';

const splashLogo = require('./../../../assets/splash_logo.png');

export const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [isVisibleStopWhileDriving, setIsVisibleStopWhileDriving] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsVisibleStopWhileDriving(true);
    }, 500);
  }, []);

  _renderItem = () => {
    return (
      <View style={styles.slide}>
        <Image source={splashLogo} />
        <Text style={styles.appName}>TRIP&apos;N</Text>
        <BarButton
          title="Sign Up"
          style={styles.signUpButton}
          onPress={() => navigation.navigate('SignUp')}
        />
        <BarButton
          title="Login"
          style={styles.loginButton}
          preset={PRESET.SUCCESS}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    );
  };

  return (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={[colors.palette.cyanBlue, colors.palette.softBlue]}
      style={styles.linearGradient}
    >
      <SafeAreaView style={styles.screen}>
        <StatusBar />
        <View style={styles.carouselContainer}>{_renderItem()}</View>
        <Message
          isVisible={isVisibleStopWhileDriving}
          data={{
            title: 'STOP!',
            detail: 'Do not use while driving',
            onTap: () => {
              setIsVisibleStopWhileDriving(false);
            },
          }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};
