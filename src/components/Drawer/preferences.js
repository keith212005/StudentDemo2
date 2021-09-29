import React, {useState} from 'react';
import {Text, View} from 'react-native';

// THIRD PARTY IMPORTS
import {Switch, Icon} from 'react-native-elements';

// LOCAL IMPORTS
import {useGlobalStyles} from '../../resources';

export const Preferences = props => {
  const [checked, setChecked] = useState(props.isSwitchTrue);
  const globalStyles = useGlobalStyles();

  return (
    <>
      <Text
        style={[
          globalStyles.textStyle('_16', 'text', 'PROXIMANOVA_SEMIBOLD'),
          {margin: 10},
        ]}>
        Preferences
      </Text>
      <View
        style={[globalStyles.layoutDirection('row', 'space-evenly', 'center')]}>
        <Text
          style={[globalStyles.textStyle('_14', 'text', 'PROXIMANOVA_BOLD')]}>
          Dark Theme
        </Text>
        <Switch
          value={checked}
          onValueChange={value => {
            setChecked(value);
            props.onValueChange(value);
          }}
        />
      </View>
    </>
  );
};
