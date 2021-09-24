import React from 'react';
import {Button} from 'native-base';

import {responsiveWidth} from '@resources';

export const SubmitButton = ({styles, extraStyles, title, onPress}) => {
  return (
    <Button style={[styles, {...extraStyles}]} onPress={onPress}>
      {title}
    </Button>
  );
};

SubmitButton.defaultProps = {
  styles: {
    // width: responsiveWidth(100),
    backgroundColor: 'orange',
  },
};
