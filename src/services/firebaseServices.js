import firestore from '@react-native-firebase/firestore';

class FirebaseServices {
  getUserList() {
    return new Promise((resolve, reject) => {
      firestore()
        .collection('students')
        .onSnapshot(resolve(this.onResult), reject(this.onError));

      // resolve(firestore().collection('Users'));
    });
  }
}
export const FirebaseService = new FirebaseServices();
