import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';

// THIRD PARTY IMPORTS
import {createDrawerNavigator} from '@react-navigation/drawer';

// LOCAL IMPORTS
import {images} from '@resources';
import {renderIcon, DrawerContent} from '@components';
import {localize} from '../languages';

import * as Screen from '@screens';

const Drawer = createDrawerNavigator();

const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export default class DrawerNavigator extends Component {
  _addScreen = (routeName, isNavigator = false, extraProps = {}) => {
    return (
      <Drawer.Screen
        name={routeName}
        component={!isNavigator ? Screen[routeName] : extraProps}
        {...extraProps}
      />
    );
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <Drawer.Navigator
        initialRouteName={'StudentList'}
        drawerContent={props => <DrawerContent {...props} />}
        screenOptions={{headerShown: false, cardStyleInterpolator: forFade}}>
        {this._addScreen('StudentList', false, {
          options: {
            headerShown: true,
            title: localize('STUDENTS_LIST'),
            headerRight: () => (
              <TouchableOpacity onPress={() => navigate('AddStudent')}>
                {renderIcon(images.plus, 30, {
                  marginRight: 10,
                  tintColor: 'grey',
                })}
              </TouchableOpacity>
            ),
          },
        })}
        {this._addScreen('Language', false, {
          options: {headerShown: true, title: localize('CHANGE_LANGUAGE')},
        })}

        {this._addScreen('Notifications', false, {
          options: {headerShown: true, title: 'Notifications'},
        })}
      </Drawer.Navigator>
    );
  }
}
