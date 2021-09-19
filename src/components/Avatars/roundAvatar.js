import React, {Component} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';

import {Avatar, View} from 'native-base';
import {renderIcon} from '../commonViews';
import {
  images,
  colors,
  responsiveHeight,
  responsiveWidth,
  commonStyles,
} from '@resources';

export default class RoundAvatar extends React.PureComponent {
  render() {
    return (
      <>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageStyle}
            source={{
              uri: this.props.uri,
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
      </>
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
