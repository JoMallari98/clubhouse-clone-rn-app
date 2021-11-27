import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { BarButton } from '../bar-button';
import { PRESET } from '../../constants';
import styles from './styles';
import { CircleButton } from '../';
import { w } from '../../theme';

const SPEAKER_ICON = require('../../../assets/speaker.png');
const LISTENER_ICON = require('../../../assets/listener.png');

export const OneOnOneConfirmation = ({ isVisible, data }) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={[styles.container, data?.style]}>
        <Text style={[styles.title, data?.titleStyle]}>{data?.title ?? 'Error'}</Text>
        {/*<Text style={[styles.detail, data?.detailStyle]}>{data?.detail ?? ''}</Text>*/}
        <View style={styles.buttonContainer}>
          <View style={styles.listenerContainer}>
            <CircleButton
              size={w(64)}
              source={LISTENER_ICON}
              onPress={() => data?.onTap('listener')}
            />
            <Text style={styles.buttonTitle}>Listener</Text>
          </View>
          <View style={styles.speakerContainer}>
            <CircleButton
              size={w(64)}
              source={SPEAKER_ICON}
              onPress={() => data?.onTap('speaker')}
            />
            <Text style={styles.buttonTitle}>Speaker</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};
