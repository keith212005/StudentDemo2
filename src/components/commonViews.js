import React from 'react';
import {Image} from 'react-native';

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
