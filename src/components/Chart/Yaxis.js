import React from 'react';

// THIRD PARTY IMPORTS
import {YAxis} from 'react-native-svg-charts';
import * as scale from 'd3-scale';

// LOCAL IMPORTS

export const Yaxis = props => {
  return (
    <YAxis
      min={0}
      svg={{fill: 'grey', fontSize: 10}}
      formatLabel={value => `${value}`}
      contentInset={{top: 10, bottom: 10}}
      {...props}
    />
  );
};
