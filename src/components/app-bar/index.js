import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { PRESET } from '../../constants';
import { useNavigation } from '@react-navigation/core';

const BACK_ICON = require('../../../assets/back.png');

export const AppBar = ({
  style,
  title,
  richTitle,
  titleStyle,
  isVisibleBack = true,
  leftIcon,
  leftIconStyles,
  onPressLeftIcon,
  rightIcon,
  rightIconStyles,
  onPressRightIcon,
  ...props
}) => {
  const navigation = useNavigation();

  const onTapLeftIcon = () => {
    if (onPressLeftIcon == null) {
      navigation.goBack();
    } else {
      onPressLeftIcon();
    }
  };

  const onTapRightIcon = () => {
    onPressRightIcon();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={!isVisibleBack}
        style={styles.leftContainer}
        onPress={onTapLeftIcon}
      >
        {isVisibleBack && (
          <Image source={leftIcon ?? BACK_ICON} style={leftIconStyles ?? styles.leftIcon} />
        )}
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        {title && <Text style={styles.title}>{title}</Text>}
        {richTitle && richTitle()}
      </View>
      <TouchableOpacity style={styles.rightContainer} onPress={onTapRightIcon}>
        {onPressRightIcon && rightIcon && (
          <Image source={rightIcon} style={rightIconStyles ?? styles.rightIcon} />
        )}
      </TouchableOpacity>
    </View>
  );
};
