import React from 'react';

import {Icon} from 'react-native-elements';
import {useTheme, useNavigation, DrawerActions} from '@react-navigation/native';
import {navigate} from '../../navigator';

export const HeaderLeftIcon = props => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  return (
    <Icon
      containerStyle={{margin: 10, borderRadius: 100}}
      name={'menu'}
      type="feather"
      color={colors.text}
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
    />
  );
};

export const HeaderRightIcon = props => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  return (
    <Icon
      containerStyle={{marginRight: 20, borderRadius: 100}}
      name={'plus-circle'}
      type="font-awesome"
      color={colors.text}
      onPress={() => navigate('AddStudent')}
    />
  );
};
