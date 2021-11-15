/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import {colors} from '@resources';

export default class CustomLoader extends React.PureComponent {
  render() {
    return (
      <ActivityIndicator
        size="large"
        color={colors.orange}
        style={{
          flex: 1,
          position: 'absolute',
          zIndex: 1,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.placeHolderColor,
        }}
      />
    );
  }
}
