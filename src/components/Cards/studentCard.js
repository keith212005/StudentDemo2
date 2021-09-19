import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import {Card, ListItem, Button, Icon, Avatar} from 'react-native-elements';
import {commonStyles, images, responsiveWidth} from '@resources';

export default class StudentCard extends Component {
  render() {
    const {firstname, lastname} = this.props.item;
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
              activeOpacity={0.7}
              source={{
                uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }}
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
