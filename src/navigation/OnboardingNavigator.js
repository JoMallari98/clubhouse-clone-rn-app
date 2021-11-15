import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  CarouselScreen,
  ForgotPasswordCreateNewPasswordScreen,
  ForgotPasswordScreen,
  ForgotPasswordSubmitScreen,
  LoginScreen,
  OnboardingScreen,
  SignUpScreen,
} from '../screens';

const Stack = createStackNavigator();

export const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Carousel"
    >
      <Stack.Screen name="Carousel" component={CarouselScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen
        name="ForgotPasswordCreateNewPassword"
        component={ForgotPasswordCreateNewPasswordScreen}
      />
      <Stack.Screen name="ForgotPasswordSubmit" component={ForgotPasswordSubmitScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};
