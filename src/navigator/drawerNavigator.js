import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';

// THIRD PARTY IMPORTS
import {useTheme, useNavigation, DrawerActions} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Icon} from 'react-native-elements';

// LOCAL IMPORTS
import * as Screen from '@screens';
import {images} from '@resources';
import {
  renderIcon,
  DrawerContent,
  HeaderLeftIcon,
  HeaderRightIcon,
} from '@components';
import {localize} from '../languages';
import {actionCreators} from '../actions';
import {navigate} from './RootNavigation';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Drawer = createDrawerNavigator();

const DrawerNav = props => {
  /* Define constants */
  const {colors} = useTheme();
  const navigation = useNavigation();

  /* Define constants */

  this._addScreen = (routeName, isNavigator = false, extraProps = {}) => {
    return (
      <Drawer.Screen
        name={routeName}
        component={!isNavigator ? Screen[routeName] : extraProps}
        {...extraProps}
      />
    );
  };

  return (
    <Drawer.Navigator
      initialRouteName={'StudentList'}
      screenOptions={{drawerType: 'slide'}}
      drawerContent={props => <DrawerContent {...props} />}>
      {this._addScreen('StudentList', false, {
        options: {
          headerShown: true,
          title: localize('STUDENTS_LIST'),
          headerRight: () => <HeaderRightIcon />,
          headerLeft: () => <HeaderLeftIcon />,
        },
      })}

      {this._addScreen('Language', false, {
        options: {headerShown: true, headerLeft: () => <HeaderLeftIcon />},
      })}

      {this._addScreen('Notifications', false, {
        options: {
          headerShown: true,
          title: 'Notifications',
          headerLeft: () => <HeaderLeftIcon />,
        },
      })}

      {this._addScreen('VideoScreen', false, {
        options: {headerShown: true, headerLeft: () => <HeaderLeftIcon />},
      })}

      {this._addScreen('AudioList', false, {
        options: {headerShown: true, headerLeft: () => <HeaderLeftIcon />},
      })}
    </Drawer.Navigator>
  );
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

//Connect everything
export const DrawerNavigator = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawerNav);
