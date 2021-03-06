import React from 'react';
import {StatusBar, TouchableOpacity, Platform} from 'react-native';

// THIRD PARTY IMPORT
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// LOCAL IMPORTS
import * as Screen from '@screens';
import {DrawerNavigator} from './index';
import {navigationRef} from './RootNavigation';
import {localize} from '../languages';
import {actionCreators} from '../actions';
import {colors, images} from '@resources';
import {navigate} from './RootNavigation';
import {renderImage} from '../components';

const Stack = createStackNavigator();

const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...colors,
  },
};

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
  },
};

const StackNav = props => {
  this.addScreen = (routeName, isNavigator = false, extraProps = {}) => {
    return (
      <Stack.Screen
        name={routeName}
        component={!isNavigator ? Screen[routeName] : extraProps}
        {...extraProps}
      />
    );
  };

  const {colors} = useTheme();
  // console.log('DarkTheme colore>>>>>', MyDarkTheme);
  // console.log('DefaultTheme colore>>>>>', LightTheme);

  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        theme={props.isDarkTheme ? MyDarkTheme : LightTheme}>
        <Stack.Navigator
          initialRouteName={'SplashScreen'}
          screenOptions={{
            headerShown: false,
            headerMode: 'screen',
            gestureEnabled: false,
            cardStyleInterpolator: forFade,
            // headerStatusBarHeight: 0,
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
            options: {
              headerRight: () => (
                <TouchableOpacity onPress={() => navigate('AddStudent')}>
                  {renderImage(images.calendar, 30, {
                    marginRight: 10,
                    tintColor: colors.text,
                  })}
                </TouchableOpacity>
              ),
            },
          })}
          {this.addScreen('Language')}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

function mapStateToProps(state) {
  return {
    isDarkTheme: state.isDarkTheme,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

//Connect everything
export const StackNavigator = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StackNav);
