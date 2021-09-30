import React from 'react';
import {Slider} from 'react-native-elements';
import {responsiveHeight, responsiveWidth} from '../../resources';
import {useTheme} from '@react-navigation/native';
import {Icon} from 'react-native-elements';

export const MusicSlider = props => {
  const {colors} = useTheme();
  return (
    <Slider
      animateTransitions
      animationType="timing"
      maximumTrackTintColor="#ccc"
      maximumValue={100}
      minimumTrackTintColor="#222"
      minimumValue={0}
      onSlidingComplete={() => console.log('onSlidingComplete()')}
      onSlidingStart={() => console.log('onSlidingStart()')}
      onValueChange={value => console.log('onValueChange()', value)}
      orientation="horizontal"
      step={1}
      style={{width: responsiveWidth(100), height: responsiveHeight(10)}}
      thumbStyle={{height: 20, width: 20}}
      thumbProps={{
        children: (
          <Icon
            name="music"
            type="font-awesome-5"
            size={10}
            reverse
            containerStyle={{bottom: 10, right: 10}}
            color={colors.orange}
          />
        ),
      }}
      thumbTintColor="#0c0"
      thumbTouchSize={{width: 40, height: 40}}
      trackStyle={{height: 5, borderRadius: 20}}
      {...props}
    />
  );
};
