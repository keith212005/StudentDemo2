import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, Platform} from 'react-native';

// THIRD PARTY IMPORTS
import {setMultipleAsyncStorage} from '@storage';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';

import {CommonActions} from '@react-navigation/native';
import {localize} from '@languages';
import {styles} from './style';
import {actionCreators} from '@actions';

class Login extends Component {
  componentDidMount() {
    if (this.props.isAppOpenFirstTime) {
      this.requestPermissions();
    }
    this.props.isOpenFirstTime(false);
  }

  oneOfThem(array, value) {
    return array.includes(value);
  }

  requestPermissions() {
    return new Promise((resolve, reject) => {
      var permissions = [];
      if (Platform.OS == 'ios') {
        permissions = [
          PERMISSIONS.IOS.CAMERA,
          PERMISSIONS.IOS.LOCATION_ALWAYS,
          PERMISSIONS.IOS.WRITE_EXTERNAL_STORAGE,
        ];
      } else {
        permissions = [
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ];
      }

      requestMultiple(permissions).then(statuses => {
        const permissionStatus = [statuses[permissions[0]]];
        if (this.oneOfThem(permissionStatus, 'granted')) {
          resolve(permissionStatus);
        }
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
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

function mapStateToProps(state) {
  return {isAppOpenFirstTime: state.isOpenedFirstTime};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Login);
