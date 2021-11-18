import React, { useEffect, useState } from 'react';
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
  const [mute, setMute] = useState(!data.isMicOn);
  useEffect(() => {
    setMute(!data.isMicOn);
  }, [data?.isMicOn]);
  return (
    <View style={[style]}>
      <TouchableOpacity
        onPress={() => {
          onPress();
          setMute(!mute);
        }}
      >
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
              style={[styles(size).imageContainer, mute ? styles(size).mutedImageContainer : null]}
              imageStyle={styles(size).imageStyle}
            ></ImageBackground>
          )}
          {mute && !isCurrentUser && (
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
                  source={mute ? MUTED_MIC_ICON : null}
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
