/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

import {Card, Icon, Avatar} from 'react-native-elements';
import {commonStyles, images} from '@resources';

export default class StudentCard extends Component {
  render() {
    const {firstname, lastname, download_url} = this.props.item;
    return (
      <Pressable onPress={this.props.onPress}>
        <Card containerStyle={styles.cardContainerStyle}>
          <View style={styles.container}>
            <Avatar
              containerStyle={{margin: 10}}
              size="medium"
              rounded
              title="MT"
              onPress={this.props.onPress}
              source={{uri: download_url ? download_url : images.error}}
            />

            <View
              style={[
                commonStyles.layoutDirection('column', 'center', 'flex-start'),
                {flex: 8, marginLeft: 10},
              ]}>
              <Text style={styles.textStyle}>{firstname}</Text>
              <Text style={styles.textStyle}>{lastname}</Text>
            </View>

            <View style={{flex: 2, justifyContent: 'center'}}>
              <Icon
                name="chevron-right"
                size={25}
                onPress={this.props.onPress}
              />
            </View>
          </View>
        </Card>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  cardContainerStyle: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  container: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: 18,
  },
});
