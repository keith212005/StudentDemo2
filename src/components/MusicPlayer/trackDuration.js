import React from 'react';
import {Text} from 'react-native';

import {useGlobalStyles} from '../../resources';
import {getTrackDuation} from '../../utils';
import {useProgress} from 'react-native-track-player';

const TrackDuration = () => {
  const globalStyles = useGlobalStyles();
  const {duration} = useProgress();

  return (
    <Text
      style={[globalStyles.textStyle('14', 'black', 'PROXIMANAOVA_REGULAR')]}>
      {getTrackDuation(duration)}
    </Text>
  );
};

export default TrackDuration;
