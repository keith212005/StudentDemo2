import React, {Component} from 'react';
import {SafeAreaView, Text, View, Alert, ActivityIndicator} from 'react-native';

// THIRD PARTY IMPORTS
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import Geolocation from 'react-native-geolocation-service';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';

// LOCAL IMPORTS
import {styles} from './style';
import {
  RoundAvatar,
  CustomInput,
  SubmitButton,
  DateTimePicker,
  ImagePicker,
  CustomLoader,
} from '@components';
import {images, colors} from '@resources';
import {fieldObject} from '@constants';
import {localize} from '@languages';
import {isEmpty} from '@utils';
// import {GeoLocationServices} from '@services';

export default class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      image_picker: false,
      showDatePicker: false,
      image: fieldObject,
      doc_id: fieldObject,
      firstname: fieldObject,
      lastname: fieldObject,
      dob: fieldObject,
      lat: fieldObject,
      long: fieldObject,
      profile_pic: fieldObject,
      addUpdate: localize('ADD'),
      hasLocationPermission: true,
    };

    this.inputs = new Array(6);
  }

  componentDidMount() {
    if (this.props.route.params && this.props.route.params.studentDetail) {
      this.setDataFromParams();
    } else {
      this.requestPermissions().then(() => {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            var state_object = {
              lat: {
                ...this.state['lat'],
                value: latitude.toString(),
              },
              long: {
                ...this.state['long'],
                value: longitude.toString(),
              },
            };
            this.setState(state_object);
          },
          error => console.log(error),
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      });
    }
  }

  requestPermissions() {
    return new Promise((resolve, reject) => {
      var permissions = [];
      if (Platform.OS == 'ios') {
        permissions = [
          PERMISSIONS.IOS.CAMERA,
          PERMISSIONS.IOS.LOCATION_ALWAYS,
          PERMISSIONS.IOS.WRITE_EXTERNAL_STORAGE,
        ];
      } else {
        permissions = [
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ];
      }

      requestMultiple(permissions).then(statuses => {
        const permissionStatus = [statuses[permissions[0]]];
        if (this.oneOfThem(permissionStatus, 'granted')) {
          resolve(permissionStatus);
        }
      });
    });
  }

  oneOfThem(array, value) {
    return array.includes(value);
  }

  setDataFromParams() {
    const {
      doc_id,
      firstname,
      lastname,
      dob,
      lat,
      long,
      download_url,
    } = this.props.route.params.studentDetail;

    var state_object = {
      addUpdate: localize('UPDATE'),
      doc_id: {...this.state['doc_id'], value: doc_id},
      firstname: {...this.state['firstname'], value: firstname},
      lastname: {...this.state['lastname'], value: lastname},
      dob: {...this.state['dob'], value: dob},
      lat: {...this.state['lat'], value: lat.toString()},
      long: {...this.state['long'], value: long.toString()},
      profile_pic: {...this.state['profile_pic'], value: download_url},
    };
    this.setState(state_object);
  }

  //handle of inpu box for check validation
  checkValidation(number, key, isFocus) {
    return new Promise(resolve => {
      var state_object = {};
      const profile_pic = this.state.profile_pic.value;
      const firstname = this.state.firstname.value;
      const lastname = this.state.lastname.value;
      const dob = this.state.dob.value;
      const lat = this.state.lat.value;
      const long = this.state.long.value;

      state_object[key] = {
        ...this.state[key],
        isFocus: isFocus,
      };

      switch (number) {
        case 6:
          if (isEmpty(long)) {
            state_object['long'] = {
              value: long,
              isError: true,
              errorText: localize('PLEASE_ENTER_LONG'),
              isFocus: false,
            };
          }

        case 5:
          if (isEmpty(lat)) {
            state_object['lat'] = {
              value: lat,
              isError: true,
              errorText: localize('PLEASE_ENTER_LAT'),
              isFocus: false,
            };
          }

        case 4:
          if (isEmpty(dob)) {
            state_object['dob'] = {
              value: dob,
              isError: true,
              errorText: localize('PLEASE_ENTER_DOB'),
              isFocus: false,
            };
          }

        case 3:
          if (isEmpty(lastname)) {
            state_object['lastname'] = {
              value: lastname,
              isError: true,
              errorText: localize('PLEASE_ENTER_LAST_NAME'),
              isFocus: false,
            };
          }

        case 2:
          if (isEmpty(firstname)) {
            state_object['firstname'] = {
              value: firstname,
              isError: true,
              errorText: localize('PLEASE_ENTER_FIRST_NAME'),
              isFocus: false,
            };
          }

        case 1:
          if (isEmpty(profile_pic)) {
            state_object['profile_pic'] = {
              value: profile_pic,
              isError: true,
              errorText: localize('PLEASE_SELECT_IMAGE'),
              isFocus: false,
            };
          }

        default:
          this.setState(state_object, () => resolve(true));
          break;
      }
    });
  }

  // hadnle onChangeText method of input box
  onChangeText(value, key) {
    const object = {};
    object[key] = {
      value: value,
      isError: false,
      errorText: '',
      isFocus: true,
    };
    this.setState(prevState => ({...object}));
  }

  // hadnle onSubmitEditing method of input box
  onSubmitEditing(number) {
    if (number == 2) {
      this.inputs[number + 2].focus();
    } else if (number < 5) {
      this.inputs[number + 1].focus();
    } else {
      // this.onLogin();
    }
  }

  _renderTitle = key => <Text style={{width: '92%'}}>{localize(key)}</Text>;

  _renderInputs(index, key, extraProps = {}) {
    return (
      <>
        {this._renderTitle(key)}
        <CustomInput
          refName={input => (this.inputs[number] = input)}
          value={this.state[key].value}
          valueObject={this.state[key]}
          placeholder={localize(key)}
          onFocus={() => this.checkValidation(index, key, true)}
          onEndEditing={() => this.checkValidation(index + 1, key, false)}
          onSubmitEditing={() => this.onSubmitEditing(index)}
          refName={input => (this.inputs[index] = input)}
          onChangeText={value => this.onChangeText(value, key)}
          returnKeyType="done"
          {...extraProps}
        />
      </>
    );
  }

  _renderDatePicker(index, key, extraProps = {}) {
    const {showDatePicker} = this.state;
    return (
      <>
        {this._renderTitle(key)}
        <DateTimePicker
          mode="date"
          isShow={this.state.showDatePicker}
          value={this.state[key].value}
          placeholder={localize(key)}
          onPress={() => this.setState({showDatePicker: !showDatePicker})}
          onCancel={() => this.setState({showDatePicker: !showDatePicker})}
          valueObject={this.state[key]}
          onConfirm={date => {
            this.onChangeText(
              moment(date)
                .format('DD-MM-YYYY')
                .toString(),
              'dob',
            );
            this.setState({showDatePicker: false});
          }}
        />
      </>
    );
  }

  toggleImagePicker() {
    this.setState({image_picker: !this.state.image_picker});
  }

  _renderAvatar = () => {
    return (
      <View style={{margin: 10}}>
        <RoundAvatar
          valueObject={this.state.profile_pic}
          showEditIcon={true}
          uri={this.state.profile_pic.value}
          onPress={() => this.toggleImagePicker()}
        />
      </View>
    );
  };

  _onAddUpdateStudent(type) {
    switch (type) {
      case 'Add':
        this.setState({loading: true}, () => {
          this.addStudent().then(() => {
            this.setState({loading: false});
          });
        });
        break;
      case 'Update':
        this.setState({loading: true}, () => {
          this.updateStudent().then(() => {
            this.setState({loading: false});
          });
        });
        break;
      default:
    }
  }

  addStudent() {
    const {firstname, lastname, dob, lat, long, profile_pic} = this.state;
    let coordinates = new firestore.GeoPoint(
      parseFloat(lat.value),
      parseFloat(long.value),
    );

    return new Promise((resolve, reject) => {
      let fileName = 'profile_' + firstname.value + '.png';
      storage()
        .ref(fileName)
        .putFile(profile_pic.value)
        .then(snapshot => {
          this.getImageUrl().then(url => {
            firestore()
              .collection('Users')
              .add({
                firstname: firstname.value,
                lastname: lastname.value,
                location: coordinates,
                image_name: fileName,
                download_url: url,
                dob: firestore.Timestamp.fromDate(
                  moment(dob.value, 'DD-MM-YYYY').toDate(),
                ),
              })
              .then(res => resolve())
              .catch(err => reject(err));
          });
        })
        .catch(e => console.log('uploading image error => ', e));
    });
  }

  getImageUrl() {
    let fileName = 'profile_' + this.state.firstname.value + '.png';
    return new Promise((resolve, reject) => {
      storage()
        .ref(fileName)
        .getDownloadURL()
        .then(url => resolve(url));
    });
  }

  updateStudent() {
    const {
      doc_id,
      firstname,
      lastname,
      dob,
      lat,
      long,
      profile_pic,
    } = this.state;
    let coordinates = new firestore.GeoPoint(
      parseInt(lat.value),
      parseInt(long.value),
    );
    return new Promise((resolve, reject) => {
      var washingtonRef = firestore()
        .collection('Users')
        .doc(doc_id.value)
        .set({
          firstname: firstname.value,
          lastname: lastname.value,
          dob: firestore.Timestamp.fromDate(
            moment(dob.value, 'DD-MM-YYYY').toDate(),
          ),
          location: coordinates,
          uri: profile_pic.value,
        })
        .then(() => {
          this.setState({loading: false}, () => {
            Alert.alert('Status', 'Record updated.');
          });
        });
      let fileName = 'profile_' + firstname.value + '.png';
      storage()
        .ref(fileName)
        .putFile(profile_pic.value)
        .then(snapshot => {
          this.setState({loading: false}, () => {
            Alert.alert('Status', 'Record updated.');
          });
        })
        .catch(e => console.log('uploading image error => ', e));
    });
  }

  _onAddUpdateStudent(type) {
    switch (type) {
      case localize('ADD'):
        this.setState({loading: true}, () => {
          this.addStudent().then(() => {
            this.setState({loading: false});
            Alert.alert('Status', 'Record added.');
          });
        });
        break;
      case localize('UPDATE'):
        this.setState({loading: true}, () => {
          this.updateStudent().then(() => {
            this.setState({loading: false});
          });
        });
        break;
      default:
    }
  }

  onSubmit() {
    this.checkValidation(6, 'long', false).then(() => {
      if (
        !this.state.firstname.isError &&
        !this.state.lastname.isError &&
        !this.state.dob.isError &&
        !this.state.lat.isError &&
        !this.state.long.isError &&
        !this.state.profile_pic.isError
      ) {
        this._onAddUpdateStudent(this.state.addUpdate);
      }
    });
  }

  render() {
    return (
      <KeyboardAwareScrollView>
        <SafeAreaView>
          {this.state.loading && <CustomLoader />}
          <View style={styles.container}>
            {this._renderAvatar(0, 'image')}
            {this._renderInputs(1, 'firstname')}
            {this._renderInputs(2, 'lastname')}
            {this._renderDatePicker(3, 'dob')}
            {this._renderInputs(4, 'lat', {keyboardType: 'numeric'})}
            {this._renderInputs(5, 'long', {
              keyboardType: 'numeric',
              blurOnSubmit: true,
            })}
            <SubmitButton
              title={this.state.addUpdate}
              onPress={() => this.onSubmit()}
            />
          </View>
          <ImagePicker
            show={this.state.image_picker}
            image_path={imageData =>
              this.onChangeText(imageData.path, 'profile_pic')
            }
            onClose={() => this.setState({image_picker: false})}
          />
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
}
