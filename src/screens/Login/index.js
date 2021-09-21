/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-fallthrough */

// LOCAL IMPORTS
import React, {Component} from 'react';
import {Platform, View, Text} from 'react-native';
import {actionCreators} from '@actions';
import {CustomInput, renderIcon, SubmitButton} from '@components';
import {loginFields} from '@constants';
import {localize} from '@languages';
import {CommonActions} from '@react-navigation/native';
import {images, responsiveWidth} from '@resources';
import {isEmpty} from '@utils';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import {onFacebookButtonPress} from '@services';
import {styles} from './style';
import {Icon} from 'react-native-elements';

// THIRD PARTY IMPORTS
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {...loginFields};
    this.inputs = new Array(2);
  }

  componentDidMount() {
    // if app open first time ask required permissions
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
      if (Platform.OS === 'ios') {
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

  //handle of input box for check validation
  checkValidation(number, key, isFocus) {
    return new Promise(resolve => {
      var state_object = {};
      const username = this.state.username.value;
      const password = this.state.password.value;

      state_object[key] = {
        ...this.state[key],
        isFocus: isFocus,
      };

      switch (number) {
        case 2:
          if (isEmpty(username)) {
            state_object.username = {
              value: username,
              isError: true,
              errorText: localize('PLEASE_ENTER_FIRST_NAME'),
              isFocus: false,
            };
          }

        case 1:
          if (isEmpty(password)) {
            state_object.profile_pic = {
              value: password,
              isError: true,
              errorText: localize('PLEASE_SELECT_IMAGE'),
              isFocus: false,
            };
          }

        default:
          this.setState(state_object, () => resolve(true));
          break;
      }
    });
  }

  // hadnle onChangeText method of input box
  onChangeText(value, key) {
    const object = {};
    object[key] = {
      value: value,
      isError: false,
      errorText: '',
      isFocus: true,
    };
    this.setState(prevState => ({...object}));
  }

  // hadnle onSubmitEditing method of input box
  onSubmitEditing(number) {
    if (number === 2) {
      this.inputs[number + 2].focus();
    } else if (number < 5) {
      this.inputs[number + 1].focus();
    } else {
      // this.onLogin();
    }
  }

  _renderLogo = () => {
    return renderIcon(images.hat, responsiveWidth(40));
  };

  _renderInputs(index, key, extraProps = {}, callback) {
    return (
      <CustomInput
        refName={input => (this.inputs[index] = input)}
        value={this.state[key].value}
        valueObject={this.state[key]}
        placeholder={localize(key)}
        onFocus={() => this.checkValidation(index, key, true)}
        onEndEditing={() => this.checkValidation(index + 1, key, false)}
        onSubmitEditing={() => this.onSubmitEditing(index)}
        onChangeText={value => this.onChangeText(value, key)}
        returnKeyType="done"
        togglePassword={() => callback()}
        {...extraProps}
      />
    );
  }

  goToScreen(screenName) {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: localize(screenName)}],
      }),
    );
  }

  handleSubmit() {
    // if no validation error then go to student list screeen
    this.checkValidation(6, 'long', false).then(() => {
      if (!this.state.username.isError && !this.state.password.isError) {
        this.goToScreen('STUDENT_LIST');
      }
    });
  }

  _renderSubmit = () => (
    <SubmitButton title="Login" onPress={() => this.handleSubmit()} />
  );

  render() {
    return (
      <View style={styles.container}>
        <Text />
        {this._renderLogo()}
        {this._renderInputs(0, 'username')}
        {this._renderInputs(
          0,
          'password',
          {secureTextEntry: this.state.secureTextEntry, rightIcon: true},
          () => {
            console.log('toggle passwordsssssss');
            this.setState({secureTextEntry: !this.state.secureTextEntry});
          },
        )}

        <Text style={{color: '#a82525', marginBottom: 10}}>
          Forgot password?
        </Text>
        {this._renderSubmit()}
        <Icon
          raised
          name="facebook"
          type="font-awesome"
          color="#f50"
          onPress={() => {
            onFacebookButtonPress()
              .then(res => {
                this.props.saveUserInfo(res);
                this.goToScreen('STUDENT_LIST');
                // console.log('Signed in with Facebook!', JSON.stringify(res));
              })
              .catch(error => console.log(error));
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
