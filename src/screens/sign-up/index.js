import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { TF, LinkButton, BarButton, Loader, showToast } from '../../components';
import CheckBox from '@react-native-community/checkbox';
import { PRESET } from '../../constants';
import { useNavigation } from '@react-navigation/core';
import { useSelector, useDispatch } from 'react-redux';
import { emailRegex } from '../../utils/regex';
import { triggerSignUpSaga } from '../../redux/signUp/signUpSlice';

import styles from './styles';

export const SignUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { isLoading, result, error } = useSelector((state) => state.signUp);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [fullNameError, setFullNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  useEffect(() => {
    if (isLoading) return;
    if (error) {
      return showToast({ message: error });
    }
    if (result != null) {
      //navigation.navigate('MainNavigator');
      navigation.navigate('BottomNavigator');
    }
  }, [isLoading]);

  const onTapRegister = () => {
    // validate fields
    if (fullName == null || fullName == '') {
      return setFullNameError('Full name is Required');
    } else {
      setFullNameError(null);
    }
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

    if (agreedToTerms == null || agreedToTerms == false) {
      return showToast({ message: 'You should agreed to Terms and conditions before Sign Up' });
    }

    dispatch(triggerSignUpSaga({ email, password, fullName, agreedToTerms }));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar />
      <ScrollView style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <Text style={styles.title}>Sign Up</Text>
            <TF
              style={styles.emailContainer}
              label="Full Name"
              placeholder="John Do"
              setText={(text) => setFullName(text)}
              error={fullNameError}
            />
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
            <View style={styles.termsContainer}>
              <CheckBox
                disabled={false}
                value={agreedToTerms}
                onValueChange={(newValue) => setAgreedToTerms(newValue)}
                boxType="square"
              />
              <Text style={styles.terms}>I agree to the terms and conditions</Text>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <BarButton
              title="Sign Up"
              isDisabled={false}
              style={styles.loginButton}
              preset={PRESET.PRIMARY}
              onPress={() => onTapRegister()}
            />
            <View style={styles.haveAccountContainer}>
              <Text style={styles.doYouHaveTitle}>Already have an account? </Text>
              <LinkButton
                title="Login"
                style={styles.signUpTitle}
                preset={PRESET.SUCCESS}
                onPress={() => navigation.navigate('Login')}
              />
            </View>
          </View>
        </View>
        <Loader isVisible={isLoading} />
      </ScrollView>
    </SafeAreaView>
  );
};
