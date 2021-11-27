import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AccountNavigator } from './AccountNavigator';
import { HomeNavigator } from './HomeNavigator';
import { SettingsNavigator } from './SettingsNavigator';
import { Image } from 'react-native';

const HOME_ICON = require('../../assets/nav_search.png');
const ACCOUNT_ICON = require('../../assets/nav_profile.png');
const SETTINGS_ICON = require('../../assets/nav_setting.png');

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ tintColor }) => {
            return <Image source={HOME_ICON} />;
          },
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="AccountNavigator"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ tintColor }) => {
            return <Image source={ACCOUNT_ICON} />;
          },
          title: 'Account',
        }}
      />
      <Tab.Screen
        name="SettingsNavigator"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ tintColor }) => {
            return <Image source={SETTINGS_ICON} />;
          },
          title: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};
