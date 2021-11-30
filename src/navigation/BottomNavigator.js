import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AccountNavigator } from './AccountNavigator';
import { HomeNavigator } from './HomeNavigator';
import { SettingsNavigator } from './SettingsNavigator';
import { Image } from 'react-native';

const HOME_ICON = require('../../assets/nav_home.png');
const ACCOUNT_ICON = require('../../assets/nav_profile.png');
const SETTINGS_ICON = require('../../assets/nav_setting.png');
const ACTIVE_HOME_ICON = require('../../assets/active_nav_home.png');
const ACTIVE_ACCOUNT_ICON = require('../../assets/active_nav_profile.png');
const ACTIVE_SETTINGS_ICON = require('../../assets/active_nav_setting.png');

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
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            return <Image source={focused ? ACTIVE_HOME_ICON : HOME_ICON} />;
          },
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="AccountNavigator"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            return <Image source={focused ? ACTIVE_ACCOUNT_ICON : ACCOUNT_ICON} />;
          },
          title: 'Account',
        }}
      />
      <Tab.Screen
        name="SettingsNavigator"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            return <Image source={focused ? ACTIVE_SETTINGS_ICON : SETTINGS_ICON} />;
          },
          title: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};
