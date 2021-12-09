import React, {Component} from 'react';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {NotifService} from '@services';
import {styles} from './style';

export default class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>
            Example app react-native-push-notification
          </Text>
          <View style={styles.spacer} />
          <TextInput
            style={styles.textField}
            value={this.state.registerToken}
            placeholder="Register token"
          />
          <View style={styles.spacer} />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.notif.localNotif();
            }}>
            <Text>Local Notification (now)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.notif.localNotif('sample.mp3');
            }}>
            <Text>Local Notification with sound (now)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.notif.scheduleNotif();
            }}>
            <Text>Schedule Notification in 30s</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.notif.scheduleNotif('sample.mp3');
            }}>
            <Text>Schedule Notification with sound in 30s</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.notif.cancelNotif();
            }}>
            <Text>Cancel last notification (if any)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.notif.cancelAll();
            }}>
            <Text>Cancel all notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.notif.checkPermission(this.handlePerm.bind(this));
            }}>
            <Text>Check Permission</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.notif.requestPermissions();
            }}>
            <Text>Request Permissions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.notif.abandonPermissions();
            }}>
            <Text>Abandon Permissions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.notif.getScheduledLocalNotifications(notifs =>
                console.log(notifs),
              );
            }}>
            <Text>Console.Log Scheduled Local Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.notif.getDeliveredNotifications(notifs =>
                console.log(notifs),
              );
            }}>
            <Text>Console.Log Delivered Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.notif.createOrUpdateChannel();
            }}>
            <Text>Create or update a channel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.notif.popInitialNotification();
            }}>
            <Text>popInitialNotification</Text>
          </TouchableOpacity>

          <View style={styles.spacer} />

          {this.state.fcmRegistered && <Text>FCM Configured !</Text>}

          <View style={styles.spacer} />
        </View>
      </ScrollView>
    );
  }
  onRegister(token) {
    this.setState({registerToken: token.token, fcmRegistered: true});
  }

  onNotif(notif) {
    Alert.alert(notif.title, notif.message);
  }

  handlePerm(perms) {
    Alert.alert('Permissions', JSON.stringify(perms));
  }
}
