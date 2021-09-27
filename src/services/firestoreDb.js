/* eslint-disable radix */

import {Alert} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import moment from 'moment';

class FireStoreDatabase {
  //===================== FIRESTORE QUERIES =============================
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

  // updates student details and image in firebase and storage
  updateStudent(params) {
    const {doc_id, dob, lat, long, profile_pic, isPofilePicChanged} = params;
    let coordinates = new firestore.GeoPoint(parseInt(lat), parseInt(long));
    let b_date = firestore.Timestamp.fromDate(
      moment(dob, 'DD-MM-YYYY').toDate(),
    );
    let fileName = doc_id + '.png';

    console.log('profile not changeed', isPofilePicChanged);

    return new Promise((resolve, reject) => {
      if (isPofilePicChanged) {
        console.log('profile not changeed', isPofilePicChanged);
        storage()
          .ref(fileName)
          .putFile(profile_pic)
          .then(snapshot => {
            this.getImageUrl(fileName)
              .then(url => {
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
                  .then(() => resolve())
                  .catch(e => reject(e));
              })
              .catch(e => {
                console.log('error in getImageUrl>>>>', e);
                reject(e);
              });
          })
          .catch(e => reject(e));
      } else {
        console.log('profile not changeed', isPofilePicChanged);
        this.getImageUrl(fileName)
          .then(url => {
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
              .then(() => resolve());
          })
          .catch(e => {
            console.log('error in getImageUrl>>>>', e);
            reject(e);
          });
      }
    });
  }

  // Delete image and student record from firebase
  deleteStudent(params) {
    return new Promise((resolve, reject) => {
      // Create a reference to the file to delete
      let fileName = params.doc_id + '.png';

      this.getImageUrl(fileName)
        .then(url => {
          storage()
            .refFromURL(url)
            .delete()
            .then(() => {
              firestore()
                .collection('Users')
                .doc(params.doc_id)
                .delete()
                .then(() => resolve())
                .catch(error => console.log('err in record delete', error));
            })
            .catch(err => {
              console.log('err in image del', err);
              reject(err);
            });
        })
        .catch(e => {
          console.log('error in getImageUrl>>>>', e);
          reject(e);
        });
    });
  }

  //===================== FIRESTORE QUERIES END=============================
}
export const FirestoreDb = new FireStoreDatabase();
