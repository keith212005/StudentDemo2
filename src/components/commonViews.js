import React from 'react';
import {Image} from 'react-native';

import {Avatar} from 'react-native-elements';

import {commonStyles} from '@resources';

export const renderIcon = (uri, size, extraStyle) => {
  return (
    <Image
      source={{uri: uri}}
      style={{
        ...commonStyles.squareLayout(size),
        ...extraStyle,
      }}
    />
  );
};

export const renderAvatar = (url, size, extraProps) => {
  return (
    <Avatar
      activeOpacity={0.2}
      containerStyle={{backgroundColor: '#BDBDBD'}}
      rounded
      size={size}
      source={{uri: url}}
      title="AP"
      {...extraProps}
    />
  );
};
