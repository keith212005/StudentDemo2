import React from 'react';
import {Icon} from 'react-native-elements';

import {useTheme} from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';

const SkipToPreviousButton = () => {
  console.log('pause play button');
  const {colors} = useTheme();

  const _renderIcon = (title, extraProps) => {
    return (
      <Icon
        type={'ionicon'}
        onPress={() => TrackPlayer.skipToPrevious()}
        color={colors.orange}
        size={60}
        name={title}
        {...extraProps}
      />
    );
  };

  return _renderIcon('ios-play-skip-back-circle-outline', {size: 40});
};

export default SkipToPreviousButton;
