/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';

// THIRD PARTY IMPORTS
import {Input} from 'native-base';
import _ from 'lodash';
import {useTheme} from '@react-navigation/native';

// LOCAL IMPORTS
import {localize} from '../../languages';
import {DB} from '../../services/database';
import {TodoCard} from '../../components/Cards/todoCard';
import {renderIcon, CustomLoader} from '../../components';
import {styles} from './style';
import {SafeAreaView} from 'react-native-safe-area-context';

export const Todo = props => {
  const {colors} = useTheme();
  const [loading, setLoading] = useState(true);
  const [list, setList] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [addTodo, setAddTodo] = React.useState(false);

  useEffect(() => {
    getAllTodos();
  }, [addTodo]);

  const getAllTodos = () => {
    DB.queryTodos()
      .then(res => {
        setList(res);
        setLoading(false);
      })
      .catch(e => {
        setList([]);
        setLoading(false);
      });
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

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? 95 : 85}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView>
              <View style={styles.inner}>{_renderList()}</View>
            </ScrollView>

            <View style={styles.btnContainer}>
              <Input
                flex={1}
                _light={{placeholderTextColor: colors.text}}
                _dark={{placeholderTextColor: colors.text}}
                onChangeText={v => setInputValue(v)}
                value={inputValue}
                placeholder={localize('ADD_TASK')}
              />
              {renderIcon('plus-circle', 30, 'feather', {
                containerStyle: {marginLeft: 10},
                color: colors.text,
                onPress: () => addTodoTask(),
              })}
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
