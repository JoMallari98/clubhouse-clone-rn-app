import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { BarButton } from '../bar-button';
import { PRESET } from '../../constants';
import { colors, w } from '../../theme';
import styles from './styles';

export const Loader = ({ isVisible = false, style, titleStyle, title, onTap, ...props }) => {
  if (isVisible) {
    return (
      <View style={[styles.whiteOverlay, style]}>
        <ActivityIndicator animating={isVisible} color={colors.palette.blue} size="large" />
      </View>
    );
  }
  return <></>;
};
