import React, {memo} from 'react';
import {Button, View, Pressable, StyleSheet, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Icon} from 'react-native-elements';
import moment from 'moment';

import {renderIcon} from '../commonViews';

import {
  responsiveHeight,
  responsiveWidth,
  colors,
  images,
  commonStyles,
} from '@resources';
import {isEmpty} from '@utils';

// export default class Dea

const DateTimePicker = props => {
  const {onPress, placeholder, value, isShow, valueObject} = props;

  return (
    <View>
      <View style={styles.container}>
        <Pressable onPress={onPress} style={{justifyContent: 'center'}}>
          {renderIcon(images.calendar, 28, {
            tintColor: 'grey',
            alignSelf: 'flex-end',
          })}

          <Text style={styles.textStyle}>
            {isEmpty(value) ? placeholder : value}
          </Text>
          <DateTimePickerModal isVisible={isShow} {...props} />
        </Pressable>
      </View>
      <View
        style={[commonStyles.layoutDirection('row', 'flex-start', 'center')]}>
        {valueObject.isError && (
          <>{renderIcon(images.error, 20, {marginRight: 5})}</>
        )}
        <Text>{valueObject.errorText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: responsiveWidth(95),
    borderColor: colors.grey,
    borderRadius: 5,
    padding: 8,
  },
  buttonContainer: {
    width: responsiveWidth(20),
    alignSelf: 'flex-end',
    margin: responsiveWidth(5),
  },
  textStyle: {
    fontSize: 16,
    // alignSelf: 'center',
    position: 'absolute',
    // width: '100%',
    // textAlign: 'center',
    color: colors.placeHolderColor,
  },
});

export default memo(DateTimePicker);
