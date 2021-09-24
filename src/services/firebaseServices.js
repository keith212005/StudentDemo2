/* eslint-disable radix */

import {Alert} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import moment from 'moment';

class FirebaseServices {
  // gets imageurl from server before adding new record to server
  getImageUrl(fileName) {
    return new Promise((resolve, reject) => {
      storage()
        .ref(fileName)
        .getDownloadURL()
        .then(url => resolve(url));
    });
  }

  // add student details to firebase and adds image to storage
  addStudent(params) {
    const {firstname, lastname, dob, lat, long, profile_pic} = params;
    let coordinates = new firestore.GeoPoint(parseFloat(lat), parseFloat(long));
    let b_date = firestore.Timestamp.fromDate(
      moment(dob, 'DD-MM-YYYY').toDate(),
    );

    return new Promise((resolve, reject) => {
      firestore()
        .collection('Users')
        .add({
          firstname: firstname,
          lastname: lastname,
          location: coordinates,
          dob: b_date,
        })
        .then(docRef => {
          let fileName = docRef.id + '.png';
          storage()
            .ref(fileName)
            .putFile(profile_pic)
            .then(snapshot => {
              this.getImageUrl(fileName).then(url => {
                firestore()
                  .collection('Users')
                  .doc(docRef.id)
                  .set({
                    firstname: firstname,
                    lastname: lastname,
                    dob: b_date,
                    location: coordinates,
                    uri: url,
                  })
                  .then(() => {
                    Alert.alert('Success', 'Record added successfully.', [
                      {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                      {text: 'OK', onPress: () => {}},
                    ]);
                    resolve();
                  });
              });
            })
            .catch(e => reject(e));
        })
        .catch(err => reject(err));
    });
  }

  updateStudent(params) {
    const {doc_id, dob, lat, long, profile_pic, isPofilePicChanged} = params;
    let coordinates = new firestore.GeoPoint(parseInt(lat), parseInt(long));
    let b_date = firestore.Timestamp.fromDate(
      moment(dob, 'DD-MM-YYYY').toDate(),
    );
    let fileName = doc_id + '.png';

    return new Promise((resolve, reject) => {
      if (isPofilePicChanged) {
        storage()
          .ref(fileName)
          .putFile(profile_pic)
          .then(snapshot => {
            this.getImageUrl(fileName).then(url => {
              firestore()
                .collection('Users')
                .doc(doc_id)
                .set({
                  firstname: params.firstname,
                  lastname: params.lastname,
                  dob: b_date,
                  location: coordinates,
                  uri: url,
                })
                .then(() => {
                  Alert.alert('Success', 'Record updated successfully.', [
                    {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                    {text: 'OK', onPress: () => {}},
                  ]);
                  resolve();
                })
                .catch(e => reject(e));
            });
          })
          .catch(e => reject(e));
      } else {
        this.getImageUrl(fileName).then(url => {
          firestore()
            .collection('Users')
            .doc(doc_id)
            .set({
              firstname: params.firstname,
              lastname: params.lastname,
              dob: b_date,
              location: coordinates,
              uri: url,
            })
            .then(() => {
              Alert.alert('Success', 'Record updated successfully.', [
                {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                {text: 'OK', onPress: () => {}},
              ]);
              resolve();
            });
        });
      }
    });
  }
}
export const FirebaseService = new FirebaseServices();
