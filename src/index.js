import React from 'react';
import {LogBox} from 'react-native';

// THIRD PARTY IMPORTS
import {Provider} from 'react-redux';
import {StackNavigator} from './navigator';
import {NativeBaseProvider} from 'native-base';
import {PersistGate} from 'redux-persist/integration/react';

// LOCAL IMPORTS
import {store, persistor} from './reducers';
import {DB} from './services/database';

export default class AppContainer extends React.Component {
  constructor(props ) {
    super(props);
    DB.initTables();
    // DB.deleteDatabase();
  }

  render() {
    LogBox.ignoreLogs(['Warning: ...']);

    LogBox.ignoreAllLogs();

    LogBox.ignoreLogs(['Reanimated 2']);
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NativeBaseProvider>
            <StackNavigator />
          </NativeBaseProvider>
        </PersistGate>
      </Provider>
    );
  }
}
