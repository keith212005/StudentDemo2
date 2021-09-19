import React, {Component} from 'react';
import {View, Text} from 'react-native';

// THIRD PARTY IMPORTS
import {CommonActions} from '@react-navigation/native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// LOCAL IMPORTS
import {styles} from './style';
import {localize} from '@languages';
import {actionCreators} from '@actions';

class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: localize('LOGIN')}],
        }),
      );
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the SplashScreen component</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
