import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ChatRoomSettingsScreen,
  FriendsScreen,
  HomeScreen,
  RoomScreen,
  SearchingScreen,
  StartALobbyScreen,
  ThirdPartyProfileScreen,
} from '../screens';

const Stack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Friends" component={FriendsScreen} />
      <Stack.Screen name="Searching" component={SearchingScreen} />
      <Stack.Screen name="StartALobby" component={StartALobbyScreen} />
      <Stack.Screen name="Room" component={RoomScreen} />
      <Stack.Screen name="ThirdPartyProfile" component={ThirdPartyProfileScreen} />
      <Stack.Screen name="ChatRoomSettings" component={ChatRoomSettingsScreen} />
    </Stack.Navigator>
  );
};
