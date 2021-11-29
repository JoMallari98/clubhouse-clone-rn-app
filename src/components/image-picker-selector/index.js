import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { BarButton } from '../bar-button';
import { PRESET } from '../../constants';
import styles from './styles';
import { CircleButton } from '../';
import { w } from '../../theme';

const CAPTURE_ICON = require('../../../assets/capture.png');
const FOLDER_ICON = require('../../../assets/folder.png');

export const ImagePickerSelector = ({ isVisible, data }) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={[styles.container, data?.style]}>
        <Text style={[styles.title, data?.titleStyle]}>{data?.title ?? 'Select Avatar'}</Text>
        {/*<Text style={[styles.detail, data?.detailStyle]}>{data?.detail ?? ''}</Text>*/}
        <View style={styles.buttonContainer}>
          <View style={styles.listenerContainer}>
            <CircleButton
              size={w(64)}
              source={CAPTURE_ICON}
              onPress={() => data?.onTap('camera')}
              imageStyle={{
                width: w(64 * (3 / 5)),
                height: w(64 * (3 / 5)),
              }}
            />
            <Text style={styles.buttonTitle}>Take Photo</Text>
          </View>
          <View style={styles.speakerContainer}>
            <CircleButton
              size={w(64)}
              source={FOLDER_ICON}
              onPress={() => data?.onTap('library')}
              imageStyle={{
                width: w(64 * (3 / 5)),
                height: w(64 * (3 / 5)),
              }}
            />
            <Text style={styles.buttonTitle}>Choose from Library</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};
