import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, SafeAreaView, StatusBar, ScrollView, Image } from 'react-native';
import { AppBar, ToggleButton, BarButton } from '../../components';
import LottieView from 'lottie-react-native';

import styles from './styles';
import { PRESET } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { w } from '../../theme';

const SEARCH_ANIMATION = require('../../../assets/animation/searching.json');

export const SearchingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Room');
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar />
      <AppBar title="Searching" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <TouchableOpacity>
              <LottieView
                source={SEARCH_ANIMATION}
                autoPlay
                loop
                style={{
                  width: w(200),
                  height: w(200),
                }}
              />
            </TouchableOpacity>
            <Text style={styles.searchingForRoom}>Searching for room...</Text>
          </View>
          <View style={styles.bottomContainer}>
            <BarButton
              style={styles.cancel}
              preset={PRESET.INFO}
              size={58}
              title="Cancel"
              isDisabled={false}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
