import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  FriendsScreen,
  HomeScreen,
  ProfileScreen,
  RoomScreen,
  SearchingScreen,
  SettingsScreen,
  StartALobbyScreen,
  ThirdPartyProfileScreen,
} from '../screens';

const Stack = createStackNavigator();

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Searching" component={SearchingScreen} />
      <Stack.Screen name="StartALobby" component={StartALobbyScreen} />
      <Stack.Screen name="Room" component={RoomScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ThirdPartyProfile" component={ThirdPartyProfileScreen} />
      <Stack.Screen name="Friends" component={FriendsScreen} />
    </Stack.Navigator>
  );
};
