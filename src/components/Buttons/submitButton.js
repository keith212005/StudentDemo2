import React from 'react';
import {Button} from 'native-base';

export const SubmitButton = props => {
  return <Button onPress={props.onPress}>{props.title}</Button>;
};

SubmitButton.defaultProps = {
  tintColor: 'red',
};
