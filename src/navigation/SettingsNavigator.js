import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SettingsScreen } from '../screens';

const Stack = createStackNavigator();

export const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};
