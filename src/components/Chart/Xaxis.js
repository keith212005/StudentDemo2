import React from 'react';

// THIRD PARTY IMPORTS
import {XAxis} from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import {localize} from '../../languages';
localize;

export const Xaxis = props => {
  const fill = 'rgb(134, 65, 244)';
  const data = [0, 1];

  return (
    <XAxis
      scale={scale.scaleBand}
      style={{marginLeft: 0, paddingTop: 5}}
      data={data}
      formatLabel={(value, index) => {
        return index === 0 ? localize('PENDING') : localize('COMPLETED');
      }}
      svg={{fontSize: 10, fill: 'black'}}
    />
  );
};
