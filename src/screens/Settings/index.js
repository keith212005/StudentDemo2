import React from 'react';
import {Text, Pressable, View} from 'react-native';

// THIRD PARTY IMPORTS
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// LOCAL IMPORTS
import {localize} from '@languages';
import {styles} from './style';
import {GoogleMap} from '@components';

export default class Settings extends React.Component {
  state = {
    stateOfLocale: this.props.language,
  };

  handleOnClick = label => {
    const {navigation} = this.props;
    switch (label) {
      case localize('CHANGE_LANGUAGE'):
        return navigation.navigate('Language');
      case localize('OTHER_SETTINGS'):
        break;
      default:
    }
  };

  Item = value => {
    return (
      <Pressable
        style={styles.pressable}
        activeOpacity={0.6}
        underlayColor="#818181"
        onPress={() => this.handleOnClick(value)}>
        <Text style={styles.listItem}>{value}</Text>
      </Pressable>
    );
  };

  onRegionChange(region) {
    console.log(region);
    this.setState({region});
  }

  render() {
    return (
      <GoogleMap
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onRegionChangeComplete={region => {
          this.onRegionChange(region);
        }}
      />
    );
  }
}
