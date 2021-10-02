import React from 'react';
import {Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';
import PlayAndPauseButton from './playAndPauseButton';
import {useGlobalStyles} from '../../resources';

const Controls = ({params}) => {
  const {colors} = useTheme();
  const globalStyles = useGlobalStyles();

  console.log('rendering controls');

  const handleAction = title => {
    switch (title) {
      case 'ios-play-skip-back-circle-outline':
        TrackPlayer.skipToPrevious();
        break;

      case 'ios-play-skip-forward-circle-outline':
        TrackPlayer.skipToNext();
        break;

      default:
        break;
    }
  };

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
  return (
    <View style={[globalStyles.layoutDirection('row', 'center', 'center')]}>
      {_renderIcon('ios-play-skip-back-circle-outline', {size: 40})}
      <PlayAndPauseButton />
      {_renderIcon('ios-play-skip-forward-circle-outline', {size: 40})}
    </View>
  );
};

export default Controls;
