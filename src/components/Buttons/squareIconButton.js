import React from 'react';
import {Image} from 'react-native';
import {Button, Stack, Icon, Center, NativeBaseProvider} from 'native-base';
import {images, commonStyles} from '@resources';

export const SquareIconButton = props => {
  return (
    <Button
      onPress={props.onPress}
      startIcon={
        <Image
          source={{uri: images.plus}}
          style={[
            commonStyles.squareLayout(props.iconSize),
            {tintColor: props.tintColor},
          ]}
        />
      }>
      {props.title}
    </Button>
  );
};

SquareIconButton.defaultProps = {
  tintColor: 'red',
};
