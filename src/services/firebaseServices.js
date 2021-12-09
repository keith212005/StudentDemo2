import {Component} from 'react';

import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
var PushNotification = require('react-native-push-notification');

class Firebase extends Component {
  checkPermission = async () => {
    return new Promise(async (resolve, reject) => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      resolve(enabled);
    });
  };

  getFcmToken = async () => {
    return new Promise(async (resolve, reject) => {
      const fcmToken = await messaging().getToken();
      console.log(fcmToken);
      resolve(fcmToken);
    });
  };

  requestPermission = async () => {
    try {
      await messaging().requestPermission();
    } catch (error) {
      console.log(error);
    }
  };

  // called in Splash Screen
  async addNotificationListener(props) {
    this.checkPermission();

    messaging().setBackgroundMessageHandler(function (message) {
      console.log('Handling background message', message);
    });

    // Called everytime when notification is recieved
    messaging().onMessage(message => {
      PushNotification.localNotification({
        message: message.notification.body,
        title: message.notification.title,
        data: message.data,
      });

      PushNotification.configure({
        onNotification: function (message2) {
          message2.finish(PushNotificationIOS.FetchResult.NoData);
          console.log('onNotification callback()...', JSON.stringify(message2));
          message2.foreground
            ? props.navigation.navigate(message2.data.Screen)
            : null;
        },
        popInitialNotification: false,
        requestPermissions: true,
      });
    });

    // execute everytime we open the app from quite state.
    messaging()
      .getInitialNotification()
      .then(message => {
        console.log('App open from quite state', JSON.stringify(message));
        message ? props.navigation.navigate(message.data.Screen) : null;
      });

    // When your app is opened in background and you get notification this
    // gets tiggered
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
    });
  }

  render() {
    return null;
  }
}

export const FB = new Firebase();
