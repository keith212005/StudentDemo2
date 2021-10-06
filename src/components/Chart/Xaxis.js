import React, {useState} from 'react';
import {Text, View} from 'react-native';

// THIRD PARTY IMPORTS
import {XAxis} from 'react-native-svg-charts';
import {useFocusEffect} from '@react-navigation/native';
import * as scale from 'd3-scale';

export const Xaxis = props => {
  const fill = 'rgb(134, 65, 244)';
  const data = [0, 1];

  return (
    <XAxis
      scale={scale.scaleBand}
      style={{marginLeft: 0, paddingTop: 5}}
      data={data}
      formatLabel={(value, index) => {
        return index === 0 ? 'Pending' : 'Completed';
      }}
      // contentInset={{left: 100, right: 100}}
      svg={{fontSize: 10, fill: 'black'}}
    />
  );
};
