import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, useWindowDimensions, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../../theme';
import { setAppStatus } from '../../redux/general';
import styles from './styles';
import { APP_STATUS } from '../../constants';
import { useNavigation } from '@react-navigation/core';

const splashLogo = require('./../../../assets/splash_logo.png');

const slideData = [
  { title: ' LAUGH' },
  { title: ' LEARN' },
  { title: ' CHILL' },
  { title: ' DEBATE' },
];

export const CarouselScreen = () => {
  const { height, width } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [index, setIndex] = useState(1);

  useEffect(() => {
    let interval = null;
    if (index >= 0) {
      interval = setInterval(() => {
        setIndex((index) => index + 1);
      }, 1000);
      if (!slideData[index - 1]) {
        clearInterval(interval);
        navigation.navigate('Onboarding');
      }
    }
    return () => clearInterval(interval);
  }, [index]);

  return (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={[colors.palette.cyanBlue, colors.palette.softBlue]}
      style={styles.linearGradient}
    >
      <SafeAreaView style={styles.screen}>
        <StatusBar />
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={splashLogo} />
          </View>
          <View style={styles.carouselContainer}>
            <View style={styles.slide}>
              <Text style={styles.appName}>
                TRIP&apos;N<Text style={styles.title}>{slideData[index - 1]?.title}</Text>
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
