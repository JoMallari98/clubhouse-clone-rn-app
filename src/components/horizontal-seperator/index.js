import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export const HorizontalSeperator = ({ isVisible = false, style, ...props }) => {
  return <View style={[styles.container, style]}></View>;
};
