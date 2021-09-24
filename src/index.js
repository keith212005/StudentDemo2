import React from 'react';
import {LogBox} from 'react-native';

// THIRD PARTY IMPORTS
import {Provider} from 'react-redux';
import {StackNavigator} from './navigator';
import {NativeBaseProvider} from 'native-base';
import {PersistGate} from 'redux-persist/integration/react';

// LOCAL IMPORTS
import {store, persistor} from './reducers';

export default class AppContainer extends React.Component {
  render() {
    LogBox.ignoreLogs(['Warning: ...']);

    LogBox.ignoreAllLogs();

    LogBox.ignoreLogs(['Reanimated 2']);
    return (
      <NativeBaseProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <StackNavigator />
          </PersistGate>
        </Provider>
      </NativeBaseProvider>
    );
  }
}
