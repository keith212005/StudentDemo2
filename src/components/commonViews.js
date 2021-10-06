/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';

import {Icon, Avatar} from 'react-native-elements';

import {commonStyles} from '@resources';

export const renderIcon = (name, size, type, extraProps = {}) => {
  return <Icon name={name} size={size} type={type} {...extraProps} />;
};

export const renderImage = (uri, size, extraStyle) => {
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
