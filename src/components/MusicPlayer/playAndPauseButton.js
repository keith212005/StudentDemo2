import React, {useState} from 'react';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';

import {useTheme} from '@react-navigation/native';
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const PlayAndPauseButton = () => {
  console.log('pause play button');
  const {colors} = useTheme();

  const getTrackPlayerState = async () => {
    return await TrackPlayer.getState();
  };
  const [isPlaying, setIsplaying] = useState(getTrackPlayerState());

  useTrackPlayerEvents([Event.PlaybackState], async event => {
    console.log(event);
    if (event.state === State.Playing) {
      // const track = await TrackPlayer.getTrack(event.nextTrack);
      // setTrackDetails(track);
      // const {title} = track || {};
      // setTrackTitle(title);
      setIsplaying(true);
    } else {
      setIsplaying(false);
    }
  });

  const _renderIcon = (title, extraProps) => {
    return (
      <Icon
        type={'ionicon'}
        onPress={() => {
          if (isPlaying) {
            setIsplaying(false);
            TrackPlayer.pause();
          } else {
            setIsplaying(true);
            TrackPlayer.play();
          }
        }}
        color={colors.orange}
        size={60}
        name={title}
        {...extraProps}
      />
    );
  };
  return (
    <View>
      {_renderIcon(
        !isPlaying ? 'play-circle-outline' : 'ios-pause-circle-outline',
      )}
    </View>
  );
};

export default PlayAndPauseButton;
