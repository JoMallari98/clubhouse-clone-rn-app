import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingNavigator } from './OnboardingNavigator';
import { BottomTabNavigator } from './BottomNavigator';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

export const RootNavigator = () => {
  const { user, appStatus, profileUser } = useSelector((state) => state.general);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user == null ? (
        <Stack.Screen name="OnboardingNavigator" component={OnboardingNavigator} />
      ) : null}
      {user != null ? <Stack.Screen name="BottomNavigator" component={BottomTabNavigator} /> : null}
      {/*<Stack.Screen name="MainNavigator" component={MainNavigator} />*/}
    </Stack.Navigator>
  );
};
