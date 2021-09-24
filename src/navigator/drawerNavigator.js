import React, {Component} from 'react';
import {TouchableOpacity, Image} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer';

import {images, commonStyles, responsiveWidth} from '@resources';
import {renderIcon, DrawerContent} from '@components';
import {localize} from '@languages';

import * as Screen from '@screens';

const Drawer = createDrawerNavigator();

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
    return (
      <Drawer.Navigator
        initialRouteName={localize('STUDENT_LIST')}
        drawerContent={props => {
          return <DrawerContent {...props} />;
        }}
        screenOptions={{
          headerShown: false,
        }}>
        {this._addScreen(localize('STUDENT_LIST'), false, {
          options: {
            headerShown: true,
            title: 'Student List',
            headerRight: () => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate(localize('ADD_STUDENT'))
                }>
                {renderIcon(images.plus, 30, {marginRight: 10})}
              </TouchableOpacity>
            ),
          },
        })}
        {this._addScreen(localize('SETTINGS'), false, {
          options: {headerShown: true, title: 'Change language'},
        })}
      </Drawer.Navigator>
    );
  }
}
