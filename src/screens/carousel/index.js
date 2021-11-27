import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, StatusBar, useWindowDimensions, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../../theme';
import { setAppStatus } from '../../redux/general';
import styles from './styles';
import { APP_STATUS } from '../../constants';
import { useNavigation } from '@react-navigation/core';
import { triggerGetCurrentUser } from '../../redux/general/generalSlice';
import { StorageUtils } from '../../utils/storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
  const isFocused = useIsFocused();
  const [index, setIndex] = useState(1);
  const [isCarouselCompleted, setIsCarouselCompleted] = useState(false);
  const element = useRef(null);

  const { isLoading, user, error } = useSelector((state) => state.general);

  useEffect(() => {
    dispatch(triggerGetCurrentUser());
  }, []);

  useEffect(() => {
    let interval = null;
    if (index >= 0) {
      interval = setInterval(() => {
        setIndex((index) => index + 1);
      }, 1000);
      if (!slideData[index - 1]) {
        clearInterval(interval);
        if (user) {
          //navigation.navigate('MainNavigator');
          navigation.navigate('BottomNavigator');
        } else {
          navigation.navigate('Onboarding');
        }
        // dispatch(triggerGetCurrentUser());
      }
    }
    return () => clearInterval(interval);
  }, [index]);

  // useEffect(() => {
  //   try {
  //     console.log('user, error ', user, error);
  //     if (user == null && error == null) return;
  //     if (user != null) {
  //       console.log('trying to redirect main navigator ', user);
  //       //navigation.navigate('MainNavigator')
  //       setTimeout(() => navigation.navigate('MainNavigator'), 500);
  //     } else {
  //       console.log('trying to redirect onboarding navigator ', error);
  //       navigation.navigate('Onboarding');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [user?.email, error, isLoading]);

  // useEffect(() => {
  //   StorageUtils.removeValue('@user')
  //   //isFocused && dispatch(triggerGetCurrentUser())
  // }, [isFocused, navigation])

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
          <TouchableOpacity ref={element}>
            <View style={styles.imageContainer}>
              <Image source={splashLogo} />
            </View>
          </TouchableOpacity>
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
