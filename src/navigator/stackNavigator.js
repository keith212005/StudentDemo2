import React, {Component} from 'react';
import {StatusBar} from 'react-native';

// THIRD PARTY IMPORT
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// LOCAL IMPORTS
import * as Screen from '@screens';
import DrawerNavigator from './drawerNavigator';
import {navigationRef} from './RootNavigation';
import {localize} from '../languages';

const Stack = createStackNavigator();

const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export default class StackNavigator extends Component {
  constructor(props) {
    super(props);
  }

  addScreen = (routeName, isNavigator = false, extraProps = {}) => {
    return (
      <Stack.Screen
        name={routeName}
        component={!isNavigator ? Screen[routeName] : extraProps}
        {...extraProps}
      />
    );
  };

  render() {
    return (
      <>
        <StatusBar />
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            initialRouteName={'SplashScreen'}
            screenOptions={{
              headerShown: false,
              headerMode: 'screen',
              gestureEnabled: false,
              cardStyleInterpolator: forFade,
            }}>
            {this.addScreen('SplashScreen')}
            {this.addScreen('AddStudent', false, {
              options: {
                headerShown: true,
                title: localize('ENTER_DETAILS'),
              },
            })}
            {this.addScreen('Login')}
            {this.addScreen('DrawerNavigator', true, {
              component: DrawerNavigator,
            })}
            {this.addScreen('Language')}
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
