import React from 'react';
import {Text, Pressable, View} from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {localize} from '@languages';
import {styles} from './style';

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

  render() {
    return (
      <View>
        <Text>Settings page</Text>
      </View>
    );
  }
}
