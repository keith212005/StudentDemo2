/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

// THIRD PARTY IMPORTS
import {Divider} from 'native-base';
import _ from 'lodash';

// LOCAL IMPORTS
import {renderAvatar} from '../commonViews';
import {useGlobalStyles} from '../../resources';

const MusicCards = props => {
  const globalStyles = useGlobalStyles();

  return (
    <>
      <Divider />
      <TouchableOpacity
        style={[
          globalStyles.layoutDirection('row', 'flex-start', 'center'),
          {padding: 10},
        ]}
        onPress={() => props.onPress(props.item, props.index)}>
        {renderAvatar(props.item.artwork, 60)}
        <View style={{flexDirection: 'column', marginLeft: 20}}>
          <Text
            style={[
              globalStyles.textStyle('_18', 'text', 'PROXIMANOVA_SEMIBOLD'),
            ]}>
            {_.isEmpty(props.item.album) ? 'Not Avaiable' : props.item.album}
          </Text>
          <Text
            style={[
              globalStyles.textStyle('_14', 'text', 'PROXIMANOVA_REGULAR'),
            ]}>
            {props.item.title}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export const MusicCard = MusicCards;
