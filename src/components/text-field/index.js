import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { BarButton } from '../bar-button';
import { PRESET } from '../../constants';
import styles from './styles';
import { h, w } from '../../theme';

export const TF = ({
  style,
  textInputStyle,
  labelStyle,
  label,
  placeholderStyle,
  placeholder,
  initialValue,
  setText,
  error,
  errorStyle,
  isSecured = false,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  editable = true,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        style={[styles.textInput, error ? styles.errorTextInput : null, textInputStyle]}
        placeholder={placeholder}
        placeholderStyle={[styles.placeholder, placeholderStyle]}
        onChangeText={(text) => setText(text)}
        defaultValue={initialValue}
        secureTextEntry={isSecured}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={editable}
      />
      {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}
    </View>
  );
};
