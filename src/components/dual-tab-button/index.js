import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { PRESET } from '../../constants';

export const DualTabButton = ({ style, onPress, preset = PRESET.INFO, size = 48, ...props }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = (id) => {
    setSelectedIndex(id);
    onPress(id);
  };

  return (
    <View style={[styles(size).container, style]}>
      <View
        style={[
          styles(size).buttonContainer,
          styles(size)[(selectedIndex == 0 ? 'active' : 'default') + 'ButtonContainer'],
        ]}
      >
        <TouchableOpacity onPress={() => onSelect(0)}>
          <Text
            style={[
              styles(size).buttonTitle,
              styles(size)[(selectedIndex == 0 ? 'active' : 'default') + 'ButtonTitle'],
            ]}
          >
            Friends
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles(size).buttonContainer,
          styles(size)[(selectedIndex == 1 ? 'active' : 'default') + 'ButtonContainer'],
        ]}
      >
        <TouchableOpacity onPress={() => onSelect(1)}>
          <Text
            style={[
              styles(size).buttonTitle,
              styles(size)[(selectedIndex == 1 ? 'active' : 'default') + 'ButtonTitle'],
            ]}
          >
            Requests
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
