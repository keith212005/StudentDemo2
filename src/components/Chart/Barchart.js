import React, {useState} from 'react';
import {Text, View} from 'react-native';

// THIRD PARTY IMPORTS
import {BarChart, Grid} from 'react-native-svg-charts';
import {useFocusEffect} from '@react-navigation/native';

import {DB} from '../../services';

export const Barchart = props => {
  const [totalCount, setTotalCount] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      DB.getTotalTodoCounts()
        .then(count => setTotalCount(count))
        .catch(e => console.log(e));

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
    },

    {
      value: completed,
      svg: {
        fill: 'green',
      },
    },
  ];
  return (
    <>
      {totalCount > 0 && (
        <View style={{flex: 1}}>
          <BarChart
            style={{height: 200}}
            data={data}
            svg={{fill: 'rgba(134, 65, 244, 0.8)'}}
            yAccessor={({item}) => item.value}
            gridMin={0}
            contentInset={{top: 20, bottom: 0}}>
            <Grid />
          </BarChart>
        </View>
      )}
    </>
  );
};
