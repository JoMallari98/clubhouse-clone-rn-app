import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { BarButton } from '../bar-button';
import { PRESET } from '../../constants';
import styles from './styles';

export const Message = ({ isVisible, data }) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={[styles.container, data?.style]}>
        <Text style={[styles.title, data?.titleStyle]}>{data?.title ?? 'Error'}</Text>
        <Text style={[styles.detail, data?.detailStyle]}>{data?.detail ?? ''}</Text>
        <BarButton
          title={data?.submitBtnTitle ?? 'OK'}
          style={styles.button}
          preset={data?.preset ?? PRESET.ERROR}
          onPress={() => {
            if (data?.onTap != null) {
              data?.onTap();
            }
          }}
        />
      </View>
    </Modal>
  );
};
