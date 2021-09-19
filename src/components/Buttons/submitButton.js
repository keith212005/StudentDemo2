import React from 'react';
import {Image} from 'react-native';
import {Button, Stack, Icon, Center, NativeBaseProvider} from 'native-base';
import {images, commonStyles} from '@resources';

export const SubmitButton = props => {
  return <Button onPress={props.onPress}>{props.title}</Button>;
};

SubmitButton.defaultProps = {
  tintColor: 'red',
};
