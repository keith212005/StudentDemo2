/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
// import {Slider} from 'react-native-elements';
import Slider from '@react-native-community/slider';
import {responsiveHeight} from '../../resources';
import {useTheme} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import TrackPlayer, {useProgress} from 'react-native-track-player';

export const MusicSlider = props => {
  const {colors} = useTheme();
  const [isSeeking, setIsSeeking] = useState(false);
  const [seek, setSeek] = useState(0);
  const {duration, position} = useProgress();

  return (
    <Slider
      orientation="horizontal"
      style={{width: '100%', height: responsiveHeight(2)}}
      minimumValue={0}
      maximumValue={duration}
      maximumTrackTintColor="#ccc"
      minimumTrackTintColor="#222"
      value={isSeeking ? seek : position}
      onValueChange={value => TrackPlayer.pause()}
      onSlidingComplete={value => {
        TrackPlayer.seekTo(value);
        TrackPlayer.play();
        setIsSeeking(false);
        setSeek(value);
      }}
      thumbStyle={{height: 10, width: 5}}
      thumbProps={{
        children: (
          <Icon
            name="music"
            type="font-awesome-5"
            size={10}
            reverse
            containerStyle={{bottom: 15, right: 8}}
            color={colors.orange}
          />
        ),
      }}
      thumbTintColor="#0c0"
      thumbTouchSize={{width: 20, height: 20}}
      trackStyle={{height: 5, borderRadius: 20}}
      {...props}
    />
  );
};
