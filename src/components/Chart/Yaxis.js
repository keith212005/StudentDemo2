import React, {useState} from 'react';
import {Text, View} from 'react-native';

// THIRD PARTY IMPORTS
import {YAxis} from 'react-native-svg-charts';
import {useFocusEffect} from '@react-navigation/native';
import * as scale from 'd3-scale';

// LOCAL IMPORTS
import {DB} from '../../services';

export const Yaxis = props => {
  const [totalCount, setTotalCount] = useState(0);

  var data = [];
  if (totalCount > 0) {
    for (let i = 0; i < totalCount + 5; i++) {
      data.push(i);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      DB.getTotalTodoCounts()
        .then(count => setTotalCount(count))
        .catch(e => console.log(e));

      return () => null;
    }, []),
  );

  return (
    <YAxis
      // scale={scale.scaleBand}
      data={data}
      svg={{fill: 'grey', fontSize: 10}}
      formatLabel={value => `${value}`}
      contentInset={{top: 0, bottom: 0}}
    />
  );
};
