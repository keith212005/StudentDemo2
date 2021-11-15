/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View} from 'react-native';

import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {responsiveWidth, useGlobalStyles} from '../../resources';
import {renderImage} from '../commonViews';

const TrackInfo = props => {
  const globalStyles = useGlobalStyles();
  const [trackDetails, setTrackDetails] = useState('');
  const [trackTitle, setTrackTitle] = useState('');

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      setTrackDetails(track);
      const {title} = track || {};
      setTrackTitle(title);
    }
  });

  return (
    <View>
      {renderImage(trackDetails.artwork, responsiveWidth(30), {
        alignSelf: 'center',
        marginTop: 30,
        borderRadius: 20,
      })}
      <Text
        style={[
          globalStyles.layoutDirection('row', 'flex-start', 'center'),
          {
            paddingTop: 20,
            textAlign: 'center',
            ...globalStyles.textStyle('_18', 'orange', 'PROXIMANOVA_BOLD'),
          },
        ]}>
        {trackTitle}
      </Text>
    </View>
  );
};

export default TrackInfo;
