/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

// THIRD PARTY IMPORTS
import {Grid, BarChart, XAxis, YAxis} from 'react-native-svg-charts';
import {useFocusEffect} from '@react-navigation/native';

// LOCAL IMPORTS
import {useGlobalStyles} from '../../resources';
import {DB} from '../../services';
import {Yaxis} from './Yaxis';
import {Xaxis} from './Xaxis';
import {Barchart} from './Barchart';
import {localize} from '../../languages';

export const PieChartData = props => {
  const globalStyles = useGlobalStyles();
  const [totalCount, setTotalCount] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);

  const data = [pending, completed];

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

  const _renderTitle = () => (
    <Text
      style={[
        globalStyles.textStyle('_23', 'black', 'PROXIMANOVA_BOLD'),
        {padding: 10, textAlign: 'center'},
      ]}>
      {localize('REPORT')}
    </Text>
  );

  const _renderLabelConatiner = () => (
    <View style={styles.labelContainer}>
      <Text>
        {localize('TOTAL')} : {totalCount}
      </Text>
      <Text>
        {localize('COMPLETED')}: {completed}
      </Text>
      <Text>
        {localize('PENDING')}: {pending}
      </Text>
    </View>
  );

  return (
    <View style={{padding: 10}}>
      {_renderTitle()}

      {totalCount > 0 && (
        <View>
          {_renderLabelConatiner()}
          <View style={{flexDirection: 'row'}}>
            <Yaxis
              data={data}
              max={pending > completed ? pending : completed}
            />
            <Barchart />
          </View>
          <Xaxis />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    // borderWidth: 1,
    alignItems: 'flex-end',
    marginHorizontal: 30,
  },
});
