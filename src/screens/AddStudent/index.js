/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-fallthrough */
import React, {Component} from 'react';
import {SafeAreaView, Text, View, Alert, Platform} from 'react-native';

// THIRD PARTY IMPORTS
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

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
import {fieldObject} from '@constants';
import {localize} from '@languages';
import {isEmpty} from '@utils';
import {FirebaseService, checkPermission} from '@services';
import {responsiveWidth} from '../../resources';

const initializeState = {
  loading: false,
  image_picker: false,
  showDatePicker: false,
  addUpdate: localize('ADD'),
  doc_id: fieldObject,
  firstname: fieldObject,
  lastname: fieldObject,
  dob: fieldObject,
  lat: fieldObject,
  long: fieldObject,
  profile_pic: fieldObject,
  isPofilePicChanged: false,
};
export default class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = initializeState;
    this.inputs = new Array(6);
  }

  componentDidMount() {
    if (this.props.route.params && this.props.route.params.studentDetail) {
      this.setDataFromParams();
    } else {
      var permission = [];
      if (Platform.OS === 'ios') {
        permission = PERMISSIONS.IOS.LOCATION_ALWAYS;
      } else {
        permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      }
      setTimeout(async () => {
        checkPermission(permission)
          .then(result => {
            this.setState({loading: true});
            Geolocation.getCurrentPosition(
              position => {
                const {latitude, longitude} = position.coords;
                this.onChangeText(latitude.toString(), 'lat');
                this.onChangeText(longitude.toString(), 'long');
                this.setState({loading: false});
              },
              error => console.log(error),
              {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
            );
          })
          .catch(e => console.log(e));
      }, 500);
    }
  }

  checker = arr => arr.every(v => v === 'granted');

  setDataFromParams() {
    const {doc_id, firstname, lastname, dob, lat, long, download_url} =
      this.props.route.params.studentDetail;

    var state_object = {
      addUpdate: localize('UPDATE'),
      doc_id: {...this.state.doc_id, value: doc_id},
      firstname: {...this.state.firstname, value: firstname},
      lastname: {...this.state.lastname, value: lastname},
      dob: {...this.state.dob, value: dob},
      lat: {...this.state.lat, value: lat.toString()},
      long: {...this.state.long, value: long.toString()},
      profile_pic: {...this.state.profile_pic, value: download_url},
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
            state_object.long = {
              value: long,
              isError: true,
              errorText: localize('PLEASE_ENTER_LONG'),
              isFocus: false,
            };
          }

        case 5:
          if (isEmpty(lat)) {
            state_object.lat = {
              value: lat,
              isError: true,
              errorText: localize('PLEASE_ENTER_LAT'),
              isFocus: false,
            };
          }

        case 4:
          if (isEmpty(dob)) {
            state_object.dob = {
              value: dob,
              isError: true,
              errorText: localize('PLEASE_ENTER_DOB'),
              isFocus: false,
            };
          }

        case 3:
          if (isEmpty(lastname)) {
            state_object.lastname = {
              value: lastname,
              isError: true,
              errorText: localize('PLEASE_ENTER_LAST_NAME'),
              isFocus: false,
            };
          }

        case 2:
          if (isEmpty(firstname)) {
            state_object.firstname = {
              value: firstname,
              isError: true,
              errorText: localize('PLEASE_ENTER_FIRST_NAME'),
              isFocus: false,
            };
          }

        case 1:
          if (isEmpty(profile_pic)) {
            state_object.profile_pic = {
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
    if (number === 2) {
      this.inputs[number + 2].focus();
    } else if (number < 5) {
      this.inputs[number + 1].focus();
    } else {
      // this.onSubmit();
    }
  }

  _renderTitle = key => <Text style={styles.titleStyle}>{localize(key)}</Text>;

  _renderInputs(index, key, extraProps = {}) {
    return (
      <>
        {this._renderTitle(key)}
        <CustomInput
          refName={input => (this.inputs[index] = input)}
          value={this.state[key].value}
          valueObject={this.state[key]}
          placeholder={localize(key)}
          onFocus={() => this.checkValidation(index, key, true)}
          onEndEditing={() => this.checkValidation(index + 1, key, false)}
          onSubmitEditing={() => this.onSubmitEditing(index)}
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
              moment(date).format('DD-MM-YYYY').toString(),
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
    var params = {};
    params.doc_id = this.state.doc_id.value;
    params.firstname = this.state.firstname.value;
    params.lastname = this.state.lastname.value;
    params.dob = this.state.dob.value;
    params.lat = this.state.lat.value;
    params.long = this.state.long.value;
    params.profile_pic = this.state.profile_pic.value;
    params.isPofilePicChanged = this.state.isPofilePicChanged.value;

    switch (type) {
      case 'Add':
        this.setState({loading: true});
        FirebaseService.addStudent(params)
          .then(() => this.setState(initializeState))
          .catch(error => console.log(error));
        break;
      case 'Update':
        this.setState({loading: true});
        FirebaseService.updateStudent(params)
          .then(() => this.setState(initializeState))
          .catch(error => console.log(error));
        break;
      case 'Update':
        this.setState({loading: true});
        this.props.navigation.replace(localize('STUDENT_LIST'));
        // FirebaseService.deleteStudent(params)
        //   .then(() => {
        //     this.props.navigation.replace(localize('STUDENT_LIST'));
        //   })
        //   .catch(error => console.log(error));
        break;
      default:
        break;
    }
  }

  onSubmit(action) {
    this.checkValidation(6, 'long', false).then(() => {
      const {firstname, lastname, dob, lat, long, profile_pic} = this.state;
      if (
        !firstname.isError &&
        !lastname.isError &&
        !dob.isError &&
        !lat.isError &&
        !long.isError &&
        !profile_pic.isError
      ) {
        if (action === 'add') {
          this._onAddUpdateStudent(this.state.addUpdate);
        } else {
          this._onAddUpdateStudent('delete');
        }
      }
    });
  }

  render() {
    return (
      <KeyboardAwareScrollView>
        <SafeAreaView style={{backgroundColor: 'white'}}>
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
            <View style={styles.bottomButtonsContainer}>
              <SubmitButton
                extraStyles={{
                  width:
                    this.state.addUpdate === localize('ADD') ? '100%' : '40%',
                }}
                title={this.state.addUpdate}
                onPress={() => this.onSubmit('add')}
              />
              {this.state.addUpdate === localize('UPDATE') && (
                <SubmitButton
                  extraStyles={{width: '40%'}}
                  title={localize('DELETE_RECORD')}
                  onPress={() => this.onSubmit('delete')}
                />
              )}
            </View>
          </View>
          <ImagePicker
            show={this.state.image_picker}
            image_path={imageData => {
              this.onChangeText(imageData.path, 'profile_pic');
              this.onChangeText(true, 'isPofilePicChanged');
            }}
            onClose={() => this.setState({image_picker: false})}
          />
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
}
