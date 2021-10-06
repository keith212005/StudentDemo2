import React, {Component} from 'react';
import {Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {Avatar, View} from 'native-base';
import {renderImage} from '../commonViews';

import {
  responsiveHeight,
  responsiveWidth,
  colors,
  commonStyles,
  images,
} from '@resources';
import {isEmpty} from '@utils';

export default class RoundAvatar extends React.PureComponent {
  render() {
    const {isError, errorText} = this.props.valueObject;
    return (
      <View style={{alignItems: 'center'}}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageStyle}
            source={{
              uri: isEmpty(this.props.uri)
                ? images.user_placeholder
                : this.props.uri,
              cache: 'force-cache',
            }}
          />
          {this.props.showEditIcon && (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={this.props.onPress}>
              <Image
                source={{uri: images.edit}}
                style={{width: 26, aspectRatio: 1, tintColor: 'gray'}}
              />
            </TouchableOpacity>
          )}
        </View>

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
  imageContainer: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.grey,
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  iconContainer: {
    backgroundColor: colors.grey,
    borderRadius: 60,
    position: 'absolute',
    right: 2,
    bottom: 0,
  },
  imageStyle: {
    ...commonStyles.squareLayout(90),
    borderRadius: 100,
  },
});
