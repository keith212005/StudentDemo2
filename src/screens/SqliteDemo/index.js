/* eslint-disable no-sparse-arrays */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';

// THIRD PARTY IMPORTS
import {Input, IconButton} from 'native-base';
import {Icon, CheckBox} from 'react-native-elements';
import _ from 'lodash';

// LOCAL IMPORTS
import {responsiveWidth, useGlobalStyles} from '../../resources';
import {localize} from '../../languages';

import {DB} from '../../services/database';

export const SqliteDemo = props => {
  const globalStyles = useGlobalStyles();
  const [list, setList] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [addTodo, setAddTodo] = React.useState(false);

  useEffect(() => {
    getAllTodos();
  }, [addTodo]);

  const getAllTodos = () => {
    DB.queryTodos()
      .then(res => setList(res))
      .catch(e => console.log(e));
  };

  const _renderFlatlistItem = item => {
    return (
      <View
        style={[
          globalStyles.layoutDirection('row', 'space-between', 'center'),
          {marginHorizontal: responsiveWidth(5)},
        ]}>
        <CheckBox
          style={{borderWidth: 1}}
          value={item.title}
          checked={item.isCompleted}
        />
        <Text>{item.title}</Text>
        <Icon
          type={'font-awesome'}
          onPress={() => {}}
          size={20}
          name={'minus'}
        />
      </View>
    );
  };

  const _renderList = () => {
    return (
      <FlatList
        data={list}
        renderItem={item => _renderFlatlistItem(item.item)}
        keyExtractor={(item, index) => String(index)}
      />
    );
  };

  const addTodoTask = () => {
    if (!_.isEmpty(inputValue)) {
      let insert_sql = 'INSERT INTO TODOS (title,isCompleted) VALUES (?,?)';
      let arrValues = [inputValue, false];
      DB.addTodo(insert_sql, arrValues)
        .then(resp => {
          console.log('success add todo', resp.insertId);
          setAddTodo(!addTodo);
        })
        .catch(e => {
          console.log('fail add todo');
        });
    }
  };

  return (
    <>
      <View
        style={[
          globalStyles.layoutDirection('row', 'space-between', 'center'),
          {
            flexDirection: 'row',
            margin: 10,
          },
        ]}>
        <Input
          flex={1}
          onChangeText={v => setInputValue(v)}
          value={inputValue}
          placeholder={localize('ADD_TASK')}
        />
        <Icon
          type={'font-awesome'}
          onPress={() => {
            addTodoTask();
          }}
          size={20}
          name={'plus'}
        />
      </View>

      {_renderList()}
    </>
  );
};
