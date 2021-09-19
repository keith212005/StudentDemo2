import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar, Button} from 'react-native';

// THIRD PARTY IMPORT
import {NavigationContainer, CommonActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// LOCAL IMPORTS
import * as Screen from '@screens';
import {localize} from '@languages';

const Stack = createStackNavigator();

const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export default class StackNavigator extends Component {
  addScreen = (routeName, isNavigator = false, extraProps = {}) => {
    return (
      <Stack.Screen
        name={routeName}
        component={Screen[routeName]}
        {...extraProps}
      />
    );
  };

  render() {
    return (
      <>
        <StatusBar />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={'SplashScreen'}
            screenOptions={{
              headerShown: false,
              headerMode: 'screen',
              gestureEnabled: false,
              cardStyleInterpolator: forFade,
            }}>
            {this.addScreen(localize('SPLASH_SCREEN'))}
            {this.addScreen(localize('STUDENT_LIST'), false, {
              options: ({route, navigation}) => ({
                headerShown: true,
                title: 'Student List',
                headerRight: () => (
                  <Button
                    title="Add student"
                    onPress={() => navigation.navigate('AddStudent')}
                  />
                ),
              }),
            })}
            {this.addScreen(localize('ADD_STUDENT'), false, {
              options: {
                headerShown: true,
                title: localize('ENTER_STUDENT_DETAIL'),
              },
            })}
            {this.addScreen(localize('LOGIN'))}
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
