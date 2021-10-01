/* eslint-disable handle-callback-err */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';

// THIRD PARTY IMPORTS
import TrackPlayer, {
  Capability,
  useProgress,
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {Icon} from 'react-native-elements';
import {useTheme, useFocusEffect} from '@react-navigation/native';

// LOCAL IMPORTS
import {tracks} from '../../constants/commonValues';
import {useGlobalStyles} from '@resources';
import {MusicSlider, MusicCard} from '@components';
import {formatMusicTime, getTrackDuation} from '../../utils';
import {images, responsiveWidth} from '../../resources';

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
  stopIcon: images.plus,
});

export const AudioList = props => {
  const globalStyles = useGlobalStyles();
  const {position, duration} = useProgress();
  const {colors} = useTheme();
  const [isPlaying, setIsplaying] = useState(false);
  const [trackTitle, setTrackTitle] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setupTrackPlayer();
      return () => TrackPlayer.destroy();
    }, []),
  );

  //===========================================

  const PlayerInfo = () => {
    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
      if (
        event.type === Event.PlaybackTrackChanged &&
        event.nextTrack != null
      ) {
        const track = await TrackPlayer.getTrack(event.nextTrack);
        const {title} = track || {};
        setTrackTitle(title);
      }
    });
    return (
      <Text
        style={[
          globalStyles.layoutDirection('row', 'flex-start', 'center'),
          {
            paddingTop: 20,
            textAlign: 'center',
            ...globalStyles.textStyle('_18', 'text', 'PROXIMANOVA_BOLD'),
          },
        ]}>
        {trackTitle}
      </Text>
    );
  };

  const startPlaying = () => {
    TrackPlayer.play();
    setIsplaying(true);
  };

  const setupTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(tracks);
      startPlaying();
    } catch (error) {
      console.log('error in setupTrackPlayer..', error);
    }
  };

  const handleAction = title => {
    switch (title) {
      case 'play-circle-outline':
        TrackPlayer.play();
        setIsplaying(true);
        break;
      case 'ios-pause-circle-outline':
        TrackPlayer.pause();
        setIsplaying(false);
        break;
      case 'ios-play-skip-back-circle-outline':
        TrackPlayer.skipToPrevious()
          .then(() => {})
          .catch(async e => {
            if (e.code === 'no_previous_track') {
              TrackPlayer.reset();
              setupTrackPlayer();
            }
          });
        break;
      case 'play-skip-forward-circle-outline':
        TrackPlayer.skipToNext()
          .then(() => {})
          .catch(err => {
            TrackPlayer.stop();
            setIsplaying(false);
          });
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

  const handleItemClick = async (item, index) => {
    await TrackPlayer.skip(index);
  };

  const _renderFlatlistItem = (item, index) => {
    return (
      <MusicCard
        item={item}
        index={index}
        onPress={(item, index) => handleItemClick(item, index)}
      />
    );
  };

  const _rederFlatList = () => {
    return (
      <FlatList
        data={tracks}
        renderItem={item => _renderFlatlistItem(item.item, item.index)}
        keyExtractor={(item, index) => String(index)}
      />
    );
  };

  const _renderSlider = () => {
    return (
      <View
        style={[globalStyles.layoutDirection('row', 'space-evenly', 'center')]}>
        <Text
          style={[
            globalStyles.textStyle('14', 'text', 'PROXIMANAOVA_REGULAR'),
          ]}>
          {formatMusicTime(position)}
        </Text>
        <View style={{width: responsiveWidth(60), paddingVertical: 10}}>
          <MusicSlider />
        </View>
        <Text
          style={[
            globalStyles.textStyle('14', 'text', 'PROXIMANAOVA_REGULAR'),
          ]}>
          {getTrackDuation(duration)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <PlayerInfo />
      {_renderSlider()}
      <View
        style={[globalStyles.layoutDirection('row', 'space-evenly', 'center')]}>
        {_renderIcon('repeat', {size: 25})}
        {_renderIcon('ios-play-skip-back-circle-outline', {size: 40})}
        {_renderIcon(
          !isPlaying ? 'play-circle-outline' : 'ios-pause-circle-outline',
        )}
        {/*_renderIcon('ios-pause-circle-outline')*/}
        {_renderIcon('play-skip-forward-circle-outline', {size: 40})}
        {_renderIcon('shuffle', {size: 25})}
      </View>
      {_rederFlatList()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
