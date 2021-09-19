import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import {CommonActions} from '@react-navigation/native';
import {localize} from '@languages';
import {styles} from './style';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the Login component</Text>
        <Button
          title="Login"
          onPress={() => {
            this.props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: localize('STUDENT_LIST')}],
              }),
            );
          }}
        />
      </View>
    );
  }
}
