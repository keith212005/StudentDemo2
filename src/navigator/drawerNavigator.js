import React from 'react';

// THIRD PARTY IMPORTS
import {useTheme, useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// LOCAL IMPORTS
import * as Screen from '@screens';
import {DrawerContent, HeaderLeftIcon, HeaderRightIcon} from '@components';
import {localize} from '../languages';
import {actionCreators} from '../actions';

const Drawer = createDrawerNavigator();

const DrawerNav = props => {
  /* Define constants */
  const {colors} = useTheme();
  const navigation = useNavigation();

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
        options: {
          headerShown: true,
          title: localize('CHANGE_LANGUAGE'),
          headerLeft: () => <HeaderLeftIcon />,
        },
      })}

      {this._addScreen('Notifications', false, {
        options: {
          headerShown: true,
          title: localize('NOTIFICATION_DEMO'),
          headerLeft: () => <HeaderLeftIcon />,
        },
      })}

      {this._addScreen('VideoScreen', false, {
        options: {
          headerShown: true,
          title: localize('VIDEO_PLAYER'),
          headerLeft: () => <HeaderLeftIcon />,
        },
      })}

      {this._addScreen('Musicplayer', false, {
        options: {
          headerShown: true,
          title: localize('MUSIC_PLAYER'),
          headerLeft: () => <HeaderLeftIcon />,
        },
      })}

      {this._addScreen('SqliteDemo', false, {
        options: {
          headerShown: true,
          title: 'Sqlite Example',
          headerLeft: () => <HeaderLeftIcon />,
        },
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
