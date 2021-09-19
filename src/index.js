import React from 'react';
import {LogBox} from 'react-native';

// THIRD PARTY IMPORTS
import {Provider} from 'react-redux';
import {StackNavigator} from './navigator';
import {NativeBaseProvider, Text, Box} from 'native-base';
// LOCAL IMPORTS
import store from './reducers';

export default class AppContainer extends React.Component {
  render() {
    LogBox.ignoreLogs(['Warning: ...']);
    LogBox.ignoreAllLogs();
    return (
      <NativeBaseProvider>
        <Provider store={store}>
          <StackNavigator />
        </Provider>
      </NativeBaseProvider>
    );
  }
}
