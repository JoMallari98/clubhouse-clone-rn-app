import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { BarButton } from '../bar-button';
import { PRESET } from '../../constants';
import styles from './styles';

export const ConfirmationMessage = ({
  isVisible,
  style,
  titleStyle,
  detailStyle,
  title,
  detail,
  negativeButtonTitle,
  positiveButtonTitle,
  negativePreset,
  positivePreset,
  onTapNegative,
  onTapPositive,
}) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={[styles.container, style]}>
        <Text style={[styles.title, titleStyle]}>{title ?? 'Error'}</Text>
        <Text style={[styles.detail, detailStyle]}>{detail ?? ''}</Text>
        <View style={styles.buttonContainer}>
          <BarButton
            title={negativeButtonTitle ?? 'NO'}
            style={styles.button}
            preset={negativePreset ?? PRESET.ERROR}
            onPress={() => {
              if (onTapNegative != null) {
                onTapNegative();
              }
            }}
          />
          <BarButton
            title={positiveButtonTitle ?? 'YES'}
            style={styles.button}
            preset={positivePreset ?? PRESET.PRIMARY}
            onPress={() => {
              if (onTapPositive != null) {
                onTapPositive();
              }
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
