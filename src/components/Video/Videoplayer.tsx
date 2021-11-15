/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';

// THIRD PARTY IMPORTS
import VideoPlayer from 'react-native-video-controls';
import Modal from 'react-native-modal';
import {Dimensions, Platform} from 'react-native';
import Orientation from 'react-native-orientation';

// LOCAL IMPORTS

import {useOrientation} from '../../resources';

export const MyVideoPlayer = props => {
  const orientation = useOrientation();

  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight =
    Platform.OS === 'ios'
      ? Dimensions.get('window').height
      : require('react-native-extra-dimensions-android').get(
          'REAL_WINDOW_HEIGHT',
        );

  return (
    <>
      <View
        style={{
          flex: 1,
          height: deviceHeight,
          width: deviceWidth,
        }}>
        <Modal
          style={{margin: 0}}
          isVisible={props.isVisible}
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}>
          <VideoPlayer
            doubleTapTime={200}
            navigator={props.navigator}
            onError={error => console.log('video error>>>>>>', error)}
            onEnterFullscreen={() => Orientation.lockToLandscape()}
            onExitFullscreen={() => Orientation.lockToPortrait()}
            {...props}
          />
        </Modal>
      </View>
    </>
  );
};
