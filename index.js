import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import AppContainer from 'index';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => AppContainer);

TrackPlayer.registerPlaybackService(() =>
  require('../StudentDemo2/src/services/audioService'),
);
