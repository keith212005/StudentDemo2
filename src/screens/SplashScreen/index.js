import React, {Component} from 'react';
import {View} from 'react-native';

// THIRD PARTY IMPORTS
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// LOCAL IMPORTS
import {styles} from './style';
import {actionCreators} from '@actions';
import {renderIcon} from '@components';
import {images, responsiveWidth} from '@resources';
import {resetNavigation, navigate} from '@navigator';
import {isEmpty, isEmptyObject} from '@utils';

class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      if (isEmpty(this.props.language)) {
        navigate('Language');
      } else {
        this.props.setAppLanguage(this.props.language);
        resetNavigation(
          isEmptyObject(this.props.user_info) ? 'Login' : 'DrawerNavigator',
        );
      }
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        {renderIcon(images.hat, responsiveWidth(40))}
      </View>
    );
  }
}

function mapStateToProps(state) {
  console.log('Splash Screen STATE: >>>', state);
  return {
    user_info: state.user_info,
    language: state.app_lang.language,
    isOpenedFirstTime: state.isOpenedFirstTime,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
