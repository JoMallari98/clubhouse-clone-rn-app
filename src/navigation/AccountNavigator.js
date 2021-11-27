import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  PreviousChatDetailScreen,
  PreviousChatsScreen,
  ProfileScreen,
  ReportProfileScreen,
} from '../screens';

const Stack = createStackNavigator();

export const AccountNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="PreviousChats" component={PreviousChatsScreen} />
      <Stack.Screen name="PreviousChatDetail" component={PreviousChatDetailScreen} />
      <Stack.Screen name="ReportProfile" component={ReportProfileScreen} />
    </Stack.Navigator>
  );
};
