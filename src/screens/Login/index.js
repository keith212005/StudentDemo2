/* eslint-disable no-sparse-arrays */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-fallthrough */

import React, {Component} from 'react';
import {Platform, View, Text} from 'react-native';

// LOCAL IMPORTS
import {actionCreators} from '../../actions';
import {CustomInput, renderIcon, SubmitButton, CustomLoader} from '@components';
import {loginFields} from '@constants';
import {localize} from '@languages';
import {images, responsiveWidth, commonStyles} from '@resources';
import {isEmpty} from '@utils';
import {
  onFacebookButtonPress,
  configureGoogleSignIn,
  googleSignIn,
  signOut,
} from '@services';
import {styles} from './style';

// THIRD PARTY IMPORTS
import {CommonActions} from '@react-navigation/native';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {...loginFields};
    this.inputs = new Array(2);
  }

  componentDidMount() {
    configureGoogleSignIn();
    // if app open first time ask required permissions
    if (this.props.isAppOpenFirstTime) {
      setTimeout(() => {
        this.requestPermissions();
      }, 1000);
    }
    this.props.isOpenFirstTime(false);
    if (this.props.route.params && this.props.route.params.reset_user) {
      this.props.resetUserInfo();
      signOut();
    }
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
          if (isEmpty(password)) {
            state_object.password = {
              value: password,
              isError: true,
              errorText: localize('PLEASE_ENTER_PASSWORD'),
              isFocus: false,
            };
          }

        case 1:
          if (isEmpty(username)) {
            state_object.username = {
              value: username,
              isError: true,
              errorText: localize('PLEASE_ENTER_USERNAME'),
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
    if (number < 1) {
      this.inputs[number + 1].focus();
    } else {
      // this.onLogin();
    }
  }

  _renderLogo = () => {
    return renderIcon(images.hat, responsiveWidth(40), {alignSelf: 'center'});
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
        this.goToScreen('DRAWER_NAVIGATOR');
      }
    });
  }

  _renderSubmit = () => (
    <SubmitButton title="Login" onPress={() => this.handleSubmit()} />
  );

  confirmLoginAndNavigate(login_type) {
    if (login_type === 'google') {
      return new Promise((resolve, reject) => {
        googleSignIn()
          .then(userInfo => {
            console.log('confirmLogin And Nav', userInfo);
            let obj = {};
            obj.displayName = userInfo.user.name;
            obj.email = userInfo.user.email;
            obj.photoURL = userInfo.user.photo;
            this.props.saveUserInfo(obj);
            resolve();
          })
          .catch(error => reject(error));
      });
    } else {
      return new Promise((resolve, reject) => {
        onFacebookButtonPress()
          .then(res => {
            console.log('facebook res>>>', res.user.displayName);
            let obj = {};
            obj.displayName = res.user.displayName;
            obj.email = res.user.email;
            obj.photoURL = res.user.photoURL;
            this.props.saveUserInfo(obj);
            resolve();
          })
          .catch(error => {
            console.log(error);
            this.setState({loading: false});
          });
      });
    }
  }

  handleSocialLogin(key) {
    switch (key) {
      case 'facebook':
        // this.setState({loading: true});
        this.confirmLoginAndNavigate('facebook').then(() => {
          this.goToScreen('DRAWER_NAVIGATOR');
        });
        break;
      case 'google':
        this.confirmLoginAndNavigate('google').then(() => {
          this.goToScreen('DRAWER_NAVIGATOR');
        });
        break;

      default:
        break;
    }
  }

  _renderSocialLogin = (key, color) => {
    return (
      <View style={[{zIndex: -1}]}>
        <Icon
          raised
          name={key}
          type="font-awesome"
          color={color}
          onPress={() => this.handleSocialLogin(key)}
        />
      </View>
    );
  };

  _renderDontHaveAccount = () => {
    return (
      <View
        style={[
          commonStyles.layoutDirection('row', 'center', 'center'),
          {marginVertical: 20},
        ]}>
        <Text
          style={[
            commonStyles.textStyle('_14', 'black', 'PROXIMANOVA_REGULAR'),
          ]}>
          Don't have an account?
        </Text>
        <Text
          style={[
            commonStyles.textStyle('_14', 'blue', 'PROXIMANOVA_REGULAR'),
            {marginLeft: 10},
          ]}>
          Sign up
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this._renderLogo()}
        <View style={{marginHorizontal: 10}}>
          {this.state.loading && <CustomLoader />}

          {this._renderInputs(0, 'username', {}, () => {})}
          {this._renderInputs(
            1,
            'password',
            {
              secureTextEntry: this.state.secureTextEntry,
              rightIcon: true,
              blurOnSubmit: true,
            },
            () => {
              console.log('toggle passwordsssssss');
              this.setState({secureTextEntry: !this.state.secureTextEntry});
            },
          )}

          <Text style={styles.forgotPassword}>Forgot password?</Text>
          {this._renderSubmit()}

          {this._renderDontHaveAccount()}

          <View style={styles.socialLoginButtonsContainer}>
            {this._renderSocialLogin('facebook', '#4267B2')}
            {this._renderSocialLogin('google', '#db3236')}
          </View>
        </View>
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
