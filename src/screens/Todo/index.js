/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

// THIRD PARTY IMPORTS
import {Input} from 'native-base';
import _ from 'lodash';

// LOCAL IMPORTS
import {localize} from '../../languages';
import {DB} from '../../services/database';
import {TodoCard} from '../../components/Cards/todoCard';
import {renderIcon} from '../../components';
import {styles} from './style';

export const Todo = props => {
  const [list, setList] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [addTodo, setAddTodo] = React.useState(false);

  useEffect(() => {
    getAllTodos();
  }, [addTodo]);

  const getAllTodos = () => {
    DB.queryTodos()
      .then(res => setList(res))
      .catch(e => setList([]));
  };

  const addTodoTask = () => {
    if (!_.isEmpty(inputValue)) {
      let arrValues = [inputValue, false];
      DB.addTodo(arrValues)
        .then(resp => {
          setAddTodo(!addTodo);
          setInputValue('');
        })
        .catch(e => console.log('fail add todo'));
    }
  };

  const deleteTodo = id =>
    DB.deleteTodo(id)
      .then(() => setAddTodo(!addTodo))
      .catch(e => setAddTodo(!addTodo));

  const _renderFlatlistItem = item => {
    return (
      <TodoCard
        item={item}
        onDelete={id => deleteTodo(id)}
        onUpdate={id => {
          console.log('ipdate', id);
          DB.updateTodo(id).then(() => setAddTodo(!addTodo));
        }}
      />
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          {_renderList()}
          <View style={styles.btnContainer}>
            <Input
              flex={1}
              _light={{placeholderTextColor: 'blueGray.700'}}
              _dark={{placeholderTextColor: 'white'}}
              onChangeText={v => setInputValue(v)}
              value={inputValue}
              placeholder={localize('ADD_TASK')}
            />
            {renderIcon('plus-circle', 30, 'feather', {
              containerStyle: {marginLeft: 10},
              onPress: () => addTodoTask(),
            })}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
