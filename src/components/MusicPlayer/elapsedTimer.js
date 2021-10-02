import React from 'react';
import {Text} from 'react-native';

import {useGlobalStyles} from '../../resources';
import {formatMusicTime} from '../../utils';
import {useProgress} from 'react-native-track-player';

const ElapsedTimer = () => {
  const globalStyles = useGlobalStyles();
  const {position} = useProgress();

  return (
    <Text
      style={[globalStyles.textStyle('14', 'text', 'PROXIMANAOVA_REGULAR')]}>
      {formatMusicTime(position)}
    </Text>
  );
};

export default ElapsedTimer;
