import React from 'react';
import {StyleSheet, TextInput, View, Image, Text} from 'react-native';

import {Input, Center, NativeBaseProvider} from 'native-base';

import {
  responsiveHeight,
  responsiveWidth,
  colors,
  commonStyles,
  images,
} from '@resources';
import {renderIcon} from '../commonViews';

export default class CustomInput extends React.PureComponent {
  static defaultProps = {
    isFocus: false,
    refName: '',
    tintColor: 'red',
  };

  render() {
    const {isFocus, refName, extraProps} = this.props;
    const {isError, errorText} = this.props.valueObject;

    return (
      <View style={styles.mainContainer}>
        <View>
          <Input
            ref={refName}
            size="lg"
            placeholder={this.props.placeholder}
            _light={{placeholderTextColor: 'blueGray.400'}}
            _dark={{placeholderTextColor: 'blueGray.50'}}
            {...this.props}
          />
        </View>

        <View
          style={[commonStyles.layoutDirection('row', 'flex-start', 'center')]}>
          {isError && <>{renderIcon(images.error, 20, {marginRight: 5})}</>}
          <Text>{errorText}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    paddingHorizontal: responsiveWidth(2),
  },
});
