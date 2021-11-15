import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import styles from './styles';
import { PRESET } from '../../constants';
import { w, colors } from '../../theme';

const MIC_ICON = require('../../../assets/mic.png');
const MUTED_MIC_ICON = require('../../../assets/muted_mic.png');

export const Participant = ({
  data,
  isCurrentUser,
  style,
  source,
  onPress,
  onPressMic,
  isDisabled,
  size = w(80),
  ...props
}) => {
  const [mute, setMute] = useState(true);

  return (
    <View style={[style]}>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles(size).container]}>
          {data.isSpeaking ? (
            <View style={[styles(size).speakingBorder]}>
              <ImageBackground
                source={source}
                style={[styles(size).imageContainer]}
                imageStyle={styles(size).imageStyle}
              ></ImageBackground>
            </View>
          ) : (
            <ImageBackground
              source={source}
              style={[styles(size).imageContainer]}
              imageStyle={styles(size).imageStyle}
            ></ImageBackground>
          )}
          {!data.isMicOn && !isCurrentUser && (
            <TouchableOpacity
              disabled={!isCurrentUser}
              onPress={() => {
                onPressMic();
                setMute(!data.isMicOn);
              }}
            >
              <View style={styles(size).micContainer} onPress={onPressMic}>
                <Image
                  resizeMode="contain"
                  style={styles(size).micImage}
                  source={data?.isMicOn ? null : MUTED_MIC_ICON}
                />
              </View>
            </TouchableOpacity>
          )}
          {isCurrentUser && (
            <TouchableOpacity
              onPress={() => {
                onPressMic();
                setMute(!mute);
              }}
            >
              <View style={styles(size).micContainer} onPress={onPressMic}>
                <Image
                  resizeMode="contain"
                  style={styles(size).micImage}
                  source={mute ? MIC_ICON : MUTED_MIC_ICON}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
      <Text numberOfLines={1} ellipsizeMode="clip" style={styles(size).title}>
        {data.name}
      </Text>
    </View>
  );
};
