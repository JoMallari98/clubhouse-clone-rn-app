import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TF, LinkButton, BarButton, Loader, showToast } from '../../components';
import { PRESET } from '../../constants';
import { emailRegex } from '../../utils/regex';
import { triggerSignInSaga } from '../../redux/signIn/signInSlice';

import styles from './styles';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { isLoading, result, error } = useSelector((state) => state.signIn);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  useEffect(() => {
    if (isLoading) return;
    if (error) {
      return showToast({ message: error });
    }
    if (result != null) {
      //navigation.navigate('MainNavigator');
      //navigation.navigate('BottomNavigator');
    }
  }, [isLoading]);

  const onTapLogin = () => {
    // validate fields
    if (email == null || email == '') {
      return setEmailError('Email is Required');
    } else {
      setEmailError(null);
    }
    if (!emailRegex.test(String(email).toLowerCase())) {
      return setEmailError('Email is not valid');
    } else {
      setEmailError(null);
    }
    if (password == null || password == '') {
      return setPasswordError('Password is Required');
    } else {
      setPasswordError(null);
    }

    if (password.length < 8) {
      return setPasswordError('Password minimum length should be 8 characters');
    } else {
      setPasswordError(null);
    }

    dispatch(triggerSignInSaga({ email, password }));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar />
      <ScrollView style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <Text style={styles.title}>Welcome back</Text>
            <TF
              style={styles.emailContainer}
              label="Email"
              placeholder="johndoe@gmail.com"
              setText={(text) => setEmail(text)}
              error={emailError}
              keyboardType="email-address"
            />
            <TF
              style={styles.passwordContainer}
              label="Password"
              placeholder="Min. 8 character"
              setText={(text) => setPassword(text)}
              error={passwordError}
              isSecured={true}
            />
            <LinkButton
              style={styles.forgotPasswordContainer}
              title="Forgot Password?"
              preset={PRESET.SUCCESS}
              onPress={() => navigation.navigate('ForgotPassword')}
            />
          </View>
          <View style={styles.bottomContainer}>
            <BarButton
              title="Login"
              isDisabled={false}
              style={styles.loginButton}
              preset={PRESET.PRIMARY}
              onPress={() => onTapLogin()}
            />
            <View style={styles.haveAccountContainer}>
              <Text style={styles.doYouHaveTitle}>Do you have an account? </Text>
              <LinkButton
                title="Sign Up!"
                style={styles.signUpTitle}
                preset={PRESET.SUCCESS}
                onPress={() => navigation.navigate('SignUp')}
              />
            </View>
          </View>
        </View>
        <Loader isVisible={isLoading} />
      </ScrollView>
    </SafeAreaView>
  );
};
