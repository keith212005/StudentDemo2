import React, {Component} from 'react';
import {SafeAreaView, Text, View} from 'react-native';

// THIRD PARTY IMPORTS
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';

// LOCAL IMPORTS
import {styles} from './style';
import {
  RoundAvatar,
  CustomInput,
  SubmitButton,
  DateTimePicker,
  ImagePicker,
} from '@components';
import {images} from '@resources';
import {fieldObject} from '@constants';
import {localize} from '@languages';
import {isEmpty} from '@utils';

export default class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      image_picker: false,
      showDatePicker: false,
      image: fieldObject,
      firstname: fieldObject,
      lastname: fieldObject,
      dob: fieldObject,
      lat: fieldObject,
      long: fieldObject,
      fileDetails: '',
      profile_pic: fieldObject,
    };

    this.inputs = new Array(6);
  }

  componentDidMount() {
    // Geolocation.getCurrentPosition(info => console.log(info));

    if (this.props.route.params && this.props.route.params.studentDetail) {
      this.setDataFromParams();
    }
  }

  setDataFromParams() {
    const {
      firstname,
      lastname,
      dob,
      lat,
      long,
    } = this.props.route.params.studentDetail;
    console.log('dob>>>>>', dob);
    this.setState({firstname, lastname, dob, lat, long});

    var state_object = {
      firstname: {...this.state['firstname'], value: firstname},
      lastname: {...this.state['lastname'], value: lastname},
      dob: {...this.state['dob'], value: dob},
      lat: {...this.state['lat'], value: lat.toString()},
      long: {...this.state['long'], value: long.toString()},
    };
    this.setState(state_object);
  }

  //handle of inpu box for check validation
  checkValidation(number, key, isFocus) {
    return new Promise(resolve => {
      var state_object = {};
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
            console.log('first name is empty');
            state_object['firstname'] = {
              value: firstname,
              isError: true,
              errorText: localize('PLEASE_ENTER_FIRST_NAME'),
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
    console.log(number);
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
    // console.log('render>>>> dt pi', this.state[key].value);
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
            // console.log('date inside screen>>>>>>', date);
            var state_object = {
              dob: {
                ...this.state['dob'],
                value: moment(date)
                  .format('DD-MM-YYYY')
                  .toString(),
              },
              showDatePicker: false,
            };
            this.setState(state_object);
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
          showEditIcon={true}
          uri={this.state.profile_pic.value}
          onPress={() => this.toggleImagePicker()}
        />
      </View>
    );
  };

  render() {
    return (
      <KeyboardAwareScrollView>
        <SafeAreaView>
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
            <SubmitButton title="Save" />
          </View>
          <ImagePicker
            show={this.state.image_picker}
            onChangeData={data => {}}
            image_path={imageData => {
              console.log('imagedata>>>>>>', typeof imageData.path);
              this.setState({
                fileDetails: imageData,
                profile_pic: {
                  ...this.state['profile_pic'],
                  value: imageData.path,
                },
              });
              this.onChangeText(imageData.path, 'profile_pic');
            }}
            onClose={() => this.setState({image_picker: false})}
          />
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
}
