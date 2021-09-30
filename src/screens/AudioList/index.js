/* eslint-disable no-sparse-arrays */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';

// THIRD PARTY IMPORTS
import TrackPlayer, {Capability, useProgress} from 'react-native-track-player';
import {Icon} from 'react-native-elements';
import {Divider} from 'native-base';
import {useTheme} from '@react-navigation/native';

// LOCAL IMPORTS
import {tracks} from '../../constants/commonValues';
import {useGlobalStyles, responsiveHeight, responsiveWidth} from '@resources';
import {MusicSlider, renderAvatar, FocusAwareStatusBar} from '@components';

TrackPlayer.updateOptions({
  // Media controls capabilities
  capabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
    Capability.Stop,
  ],
  compactCapabilities: [Capability.Play, Capability.Pause],
});

export const AudioList = props => {
  const globalStyles = useGlobalStyles();
  const progress = useProgress();
  const {colors} = useTheme();

  const setupTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(tracks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setupTrackPlayer();

    return () => TrackPlayer.destroy();
  }, []);

  const handleAction = title => {
    switch (title) {
      case 'play-circle-outline':
        TrackPlayer.play();
        break;
      case 'ios-pause-circle-outline':
        TrackPlayer.pause();
        break;
      case 'ios-play-skip-back-circle-outline':
        TrackPlayer.skipToPrevious();
        break;
      case 'play-skip-forward-circle-outline':
        TrackPlayer.skipToNext();
        break;
      case 'stop-circle-outline':
        TrackPlayer.reset();
        break;
      default:
        break;
    }
  };

  const _renderIcon = (title, extraProps) => {
    return (
      <Icon
        type={'ionicon'}
        onPress={() => handleAction(title)}
        color={colors.orange}
        size={60}
        name={title}
        {...extraProps}
      />
    );
  };

  const handleItemClick = async item => {
    console.log(item);
    TrackPlayer.stop();
    await TrackPlayer.add([item]);
    TrackPlayer.play();
  };

  const _renderFlatlistItem = item => {
    return (
      <>
        <Divider />
        <TouchableOpacity
          style={[
            globalStyles.layoutDirection('row', 'flex-start', 'center'),
            {padding: 10},
          ]}
          onPress={() => handleItemClick(item)}>
          {renderAvatar(item.artwork, 60)}
          <Text
            style={[
              globalStyles.textStyle('_18', 'text', 'PROXIMANOVA_SEMIBOLD'),
              {marginLeft: 20},
              ,
            ]}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  const _renderShowTrackList = () => {
    return (
      <FlatList
        data={tracks}
        renderItem={item => _renderFlatlistItem(item.item)}
        keyExtractor={(item, index) => String(index)}
      />
    );
  };

  const _renderSlider = () => {
    console.log(progress.position);
    return (
      <MusicSlider
        value={progress.position}
        style={{
          width: responsiveWidth(90),
          height: responsiveHeight(10),
          alignSelf: 'center',
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={[globalStyles.layoutDirection('row', 'space-evenly', 'center')]}>
        {_renderIcon('ios-play-skip-back-circle-outline')}
        {_renderIcon('play-circle-outline')}
        {_renderIcon('ios-pause-circle-outline')}
        {_renderIcon('stop-circle-outline')}
        {_renderIcon('play-skip-forward-circle-outline')}
      </View>
      {_renderSlider()}

      {_renderShowTrackList()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
