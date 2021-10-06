import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

// THIRD PARTY IMPORTS
import {Input} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

// LOCAL IMPORTS
import {responsiveWidth, commonStyles, images} from '@resources';
import {renderImage} from '../commonViews';

export default class CustomInput extends React.PureComponent {
  static defaultProps = {
    isFocus: false,
    refName: 0,
    tintColor: 'red',
  };

  render() {
    const {refName, secureTextEntry, rightIcon} = this.props;
    const {isError, errorText} = this.props.valueObject;

    return (
      <View style={styles.mainContainer}>
        <Input
          ref={refName}
          size="md"
          _light={{placeholderTextColor: 'blueGray.400'}}
          _dark={{placeholderTextColor: 'blueGray.50'}}
          InputRightElement={
            rightIcon && (
              <Icon
                type="font-awesome"
                name={secureTextEntry ? 'eye-slash' : 'eye'}
                size={25}
                color="#787878"
                onPress={() => this.props.togglePassword()}
                style={{marginRight: 10}}
              />
            )
          }
          {...this.props}
        />

        <View
          style={[commonStyles.layoutDirection('row', 'flex-start', 'center')]}>
          {isError && <>{renderImage(images.error, 20, {marginRight: 5})}</>}
          <Text>{errorText}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {},
});
