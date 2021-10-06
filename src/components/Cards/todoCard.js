/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

// THIRD PARTY IMPORTS
import {Icon, Card, CheckBox} from 'react-native-elements';
import {renderIcon} from '..';

// LOCAL IMPORTS
import {useGlobalStyles, responsiveWidth} from '../../resources';

export const TodoCard = ({item, onDelete, onUpdate}) => {
  const globalStyles = useGlobalStyles();

  return (
    <Card containerStyle={styles.cardContainerStyle}>
      <View
        style={[
          globalStyles.layoutDirection('row', 'space-between', 'center'),
        ]}>
        <CheckBox
          value={item.title}
          checked={item.isCompleted}
          title={item.title}
          onIconPress={() => onUpdate(item.id)}
          onPress={() => console.log('onpress...', item.id)}
          containerStyle={{
            flex: 1,
            backgroundColor: 'white',
            borderColor: 'white',
          }}
        />

        {renderIcon('trash', 25, 'font-awesome', {
          onPress: () => onDelete(item.id),
          color: 'red',
        })}
      </View>
    </Card>
  );
};

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
