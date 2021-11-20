import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Avatar,
  FriendListItem,
  FriendRequestListItem,
  GradientBarButton,
} from '../../components';
import { DualTabButton } from '../../components/dual-tab-button';
import { PRESET } from '../../constants';
import { w } from '../../theme';

import styles from './styles';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Adam Joy',
    rating: '4.9',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Root Miller',
    rating: '4.8',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Tim cook',
    rating: '5.0',
  },
];

export const FriendsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { user } = useSelector((state) => state.general);
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {}, [user]);

  const renderFriendRequestList = () => {
    return (
      <View style={styles.friendListContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={DATA}
          renderItem={renderFriendRequestListItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  const renderFriendRequestListItem = ({ item }) => {
    return (
      <FriendRequestListItem
        item={item}
        onTap={(item) => {
          navigation.navigate('ThirdPartyProfile');
        }}
        onTapAccept={(item) => {
          console.log('on tap chat item ', item.name);
        }}
        onTapReject={(item) => {}}
      />
    );
  };

  const renderFriendList = () => {
    return (
      <View style={styles.friendListContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={DATA}
          renderItem={renderFriendListItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  const renderFriendListItem = ({ item }) => {
    return (
      <FriendListItem
        item={item}
        onTap={(item) => {
          navigation.navigate('ThirdPartyProfile');
        }}
        onTapChat={(item) => {
          console.log('on tap chat item ', item.name);
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar />
      <AppBar title={selectedIndex == 0 ? 'Friends' : 'Requests'} />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          {selectedIndex == 0 ? renderFriendList() : renderFriendRequestList()}
        </View>
        <View style={styles.bottomContainer}>
          <DualTabButton onPress={(id) => setSelectedIndex(id)} />
        </View>
      </View>
    </SafeAreaView>
  );
};
