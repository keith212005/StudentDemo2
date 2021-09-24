import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

// THIRD PARTY IMPORT
import {NavigationContainer, CommonActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// LOCAL IMPORTS
import * as Screen from '@screens';
import {localize} from '@languages';
import {renderIcon} from '@components';
import {images, commonStyles, responsiveWidth} from '@resources';
import DrawerNavigator from './drawerNavigator';

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
        component={!isNavigator ? Screen[routeName] : extraProps}
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
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AddStudent')}>
                    <Image
                      source={{uri: images.plus}}
                      style={[
                        commonStyles.squareLayout(30),
                        {marginRight: responsiveWidth(5)},
                      ]}
                    />
                  </TouchableOpacity>
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
            {this.addScreen('DrawerNavigator', true, {
              component: DrawerNavigator,
            })}
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
