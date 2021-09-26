import React from 'react';
import {Button} from 'native-base';

import {localize} from '../../languages';

export const SubmitButton = ({styles, extraStyles, title, onPress}) => {
  return (
    <Button style={[styles, {...extraStyles}]} onPress={onPress}>
      {localize(title)}
    </Button>
  );
};

SubmitButton.defaultProps = {
  styles: {
    backgroundColor: 'orange',
  },
};
