import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { AirbnbRating, Rating } from 'react-native-ratings';
import { Avatar, BarButton, HorizontalSeperator } from '../';
import { PRESET } from '../../constants';
import styles from './styles';
import { w } from '../../theme';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/core';

const STAR_ANIMATION = require('../../../assets/animation/star-pop.json');
const PROFILE_ICON = require('../../../assets/profile.png');
const CHAT_CIRCLE = require('../../../assets/chat_circle.png');

export const RatingModal = ({ isVisible, item, onTapClose, onTapRate, onTapReport, style }) => {
  const [starRating, setStarRating] = useState(null);
  const [isVisibleRatedAnimatin, setIsVisibleRatedAnimatin] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (item?.rating != null) {
      setStarRating(parseFloat(item?.rating ?? '0'));
    } else {
      setStarRating(null);
    }
    setIsVisibleRatedAnimatin(false);
  }, [item]);
  const ratingCompleted = (rating) => {
    setStarRating(rating);
  };

  const renderRatingContainer = () => {
    if (!isVisibleRatedAnimatin) {
      return (
        <>
          <Text style={styles.ratingTitle}>Rating</Text>

          <AirbnbRating
            reviews={[]}
            count={5}
            defaultRating={starRating ?? 0}
            onFinishRating={ratingCompleted}
            size={20}
            style={styles.ratingBar}
          />
          <BarButton
            style={styles.ratingBtn}
            size={56}
            title="Rate"
            isDisabled={item?.rating == null && starRating != null ? false : true}
            preset={item?.rating == null && starRating != null ? PRESET.PRIMARY : PRESET.DISABLED}
            onPress={() => {
              setIsVisibleRatedAnimatin(true);
              setTimeout(() => {
                onTapRate({ item, rating: starRating });
                setIsVisibleRatedAnimatin(false);
              }, 2000);
            }}
          />
        </>
      );
    } else {
      return (
        <>
          <Text style={styles.ratingTitle}>Thank you for rating</Text>
          <LottieView
            source={STAR_ANIMATION}
            autoPlay
            style={{
              width: w(140),
              height: w(140),
            }}
          />
        </>
      );
    }
  };

  return (
    <Modal isVisible={isVisible} style={styles.modalContent} onBackdropPress={() => onTapClose()}>
      <View style={[styles.container, style]}>
        <View style={styles.reportButtonContainer}>
          <TouchableOpacity style={styles.reportButton} onPress={() => onTapReport(item)}>
            <Image source={CHAT_CIRCLE} />
          </TouchableOpacity>
        </View>

        <Avatar
          style={styles.avatar}
          source={item?.imageUrl ? { uri: item?.imageUrl } : PROFILE_ICON}
          isVisibleCamera={false}
          size={120}
        />
        <Text style={styles.fullName}>{item?.name ?? 'Full Name'}</Text>
        <Text style={styles.username}>{item?.username ?? '@username'}</Text>
        <HorizontalSeperator />
        {renderRatingContainer()}
      </View>
    </Modal>
  );
};
