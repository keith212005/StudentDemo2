import React, {useState} from 'react';
import {Text, View} from 'react-native';

// THIRD PARTY IMPORTS
import {BarChart, Grid} from 'react-native-svg-charts';
import {useFocusEffect} from '@react-navigation/native';

import {DB} from '../../services';

export const Barchart = props => {
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      DB.getCompletedTodos()
        .then(count => setCompleted(count))
        .catch(e => console.log(e));

      DB.getPendingTodos()
        .then(count => setPending(count))
        .catch(e => console.log(e));
      return () => null;
    }, []),
  );

  const data = [
    {
      value: pending,
      label: 'Pending',
      svg: {fill: 'orange'},
    },

    {
      value: completed,
      label: 'Completed',
      svg: {fill: 'green'},
    },
  ];
  return (
    <>
      <View style={{flex: 1}}>
        <BarChart
          style={{height: 300}}
          data={data}
          yAccessor={({item}) => item.value}
          contentInset={{top: 10, bottom: 10}}
          spacing={0.2}
          gridMin={0}
          {...props}>
          <Grid />
        </BarChart>
      </View>
    </>
  );
};
