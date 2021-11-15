import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { PRESET } from '../../constants';

export const BarButton = ({
  style,
  titleStyle,
  title,
  onPress,
  isDisabled,
  preset = PRESET.INFO,
  prefixIcon,
  suffixIcon,
  size = 64,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles(size).container,
        styles()[(isDisabled ? 'disabled' : preset) + 'Container'],
        style,
      ]}
    >
      {prefixIcon && (
        <View style={[styles(size).iconContainer, styles().prefix]}>
          <Image source={prefixIcon} />
        </View>
      )}

      <Text
        style={[
          styles(size).title,
          styles()[(isDisabled ? 'disabled' : preset) + 'Title'],
          titleStyle,
        ]}
      >
        {title ?? ''}
      </Text>
      {suffixIcon && (
        <View style={[styles(size).iconContainer, styles().suffix]}>
          <Image source={suffixIcon} />
        </View>
      )}
    </TouchableOpacity>
  );
};
