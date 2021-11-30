import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Avatar,
  FriendListItem,
  GradientBarButton,
  ImagePickerSelector,
  Loader,
  showToast,
} from '../../components';
import { PRESET } from '../../constants';
import { triggerUploadProfilePicture } from '../../redux/general/generalSlice';
import { w } from '../../theme';
import storage from '@react-native-firebase/storage';

import styles from './styles';
import { triggerGetFriends } from '../../redux/friends/friendsSlice';

const EDIT_ICON = require('../../../assets/edit.png');
const PROFILE_ICON = require('../../../assets/profile.png');
const CHAT_HISTORY_ICON = require('../../../assets/chat_history.png');
const RATING_ICON = require('../../../assets/rating.png');

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Adam Joy',
    rating: '4.9',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Root Miller',
    rating: '4.8',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Tim cook',
    rating: '5.0',
  },
];

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // const reference = storage().ref('black-t-shirt-sm.png');

  const [isVisibleImagePickerSelector, setIsVisibleImagePickerSelector] = useState(false);

  const { user, isUploadingProfilePicture, error, profileImageUrl, profileUser } = useSelector(
    (state) => state.general
  );
  const { friends, friendRequests, isLoadingGetFriends } = useSelector((state) => state.friends);

  useEffect(() => {
    dispatch(triggerGetFriends(user?.uid));
  }, []);

  //useEffect(() => {}, [user]);

  useEffect(() => {
    if (isUploadingProfilePicture) return;
    if (error) {
      return showToast({ message: error });
    }
  }, [isUploadingProfilePicture]);

  useEffect(() => {
    if (isLoadingGetFriends) return;
  }, [isLoadingGetFriends]);

  const onImagePickerSelection = async (selection) => {
    try {
      if (selection == 'camera') {
        const result = await launchCamera({
          maxWidth: 512,
          maxHeight: 512,
        });
        if (result != null && result.assets != null && result.assets.length > 0) {
          dispatch(triggerUploadProfilePicture({ uid: user?.uid, result }));
        }
      } else if (selection == 'library') {
        const result = await launchImageLibrary({
          maxWidth: 512,
          maxHeight: 512,
        });
        if (result != null && result.assets != null && result.assets.length > 0) {
          dispatch(triggerUploadProfilePicture({ uid: user?.uid, result, profileUser }));
        }
      }

      setIsVisibleImagePickerSelector(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onTapCamera = () => {
    setIsVisibleImagePickerSelector(true);
  };

  const renderPreviousChatsButton = () => {
    return (
      <View style={styles.previousChatButtonContainer}>
        <TouchableOpacity
          style={styles.previousChatButtonInnerContainer}
          onPress={() => {
            navigation.navigate('PreviousChats');
          }}
        >
          <Image source={CHAT_HISTORY_ICON} style={styles.infoButtonIcon} />
          <Text style={styles.previousChatButtonTitle}>Previous Chats</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderRatingButton = () => {
    return (
      <View style={styles.ratingButtonContainer}>
        <TouchableOpacity style={styles.ratingButtonInnerContainer}>
          <Image source={RATING_ICON} style={styles.infoButtonIcon} />
          <Text style={styles.rateTitle}>{profileUser?.numberOfRatings ?? 0}</Text>
          <Text style={styles.rateCountTitle}>({profileUser?.rating ?? 0})</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderInfoButtonContainer = () => {
    return (
      <View style={styles.infoButtonContainer}>
        {renderRatingButton()}
        {renderPreviousChatsButton()}
      </View>
    );
  };

  const renderFriendList = () => {
    return (
      <View style={styles.friendListContainer}>
        <View style={styles.friendListTitleContainer}>
          <Text style={styles.handIcon}>&#129305; </Text>
          <Text style={styles.friendListTitle}>FRIENDS ({friends.length ?? 0})</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={friends}
          renderItem={renderFriendListItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  const renderFriendListItem = ({ item }) => {
    return (
      <FriendListItem
        item={item}
        onTap={() => {
          navigation.navigate('ThirdPartyProfile', { item, uid: user?.uid });
        }}
        onTapChat={(item) => {
          console.log('on tap chat item ', item.name);
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar />
      <AppBar title="Account" />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Avatar
            style={styles.avatar}
            source={profileUser?.imageUrl ? { uri: profileUser?.imageUrl } : PROFILE_ICON}
            isVisibleCamera={true}
            size={90}
            onPress={onTapCamera}
          />

          <Text style={styles.name}>{profileUser?.fullName}</Text>
          <Text style={styles.username}>{profileUser?.username}</Text>

          {renderInfoButtonContainer()}

          {renderFriendList()}
        </View>
        <View style={styles.bottomContainer}>
          <GradientBarButton
            style={styles.startALobby}
            title="Upgrade to Premium"
            isDisabled={false}
            size={w(48)}
            preset={PRESET.PRIMARY}
            onPress={() => navigation.navigate('StartALobby')}
          />
        </View>
      </View>
      <ImagePickerSelector
        isVisible={isVisibleImagePickerSelector}
        data={{
          onTap: onImagePickerSelection,
        }}
      />
      <Loader isVisible={isUploadingProfilePicture || isLoadingGetFriends} />
    </SafeAreaView>
  );
};
