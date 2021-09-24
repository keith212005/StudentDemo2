/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';

// THIRD PARTY IMPORTS
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Avatar} from 'react-native-elements';
import {CommonActions} from '@react-navigation/native';

// LOCAL IMPORTS
import {responsiveHeight, commonStyles} from '@resources';
import {actionCreators} from '@actions';
import {localize} from '@languages';
import {isEmpty} from '@utils';
import {images} from '../../resources';

function DrawerContent(props) {
  function handleSelectedDrawerItem(label) {
    switch (label) {
      case 'Students List':
        console.log('student list pressed');
        props.navigation.navigate('StudentList');
        break;
      case 'Change language':
        props.navigation.navigate('Settings');
        console.log('Language pressed');

        break;
      case 'Logout':
        props.navigation.closeDrawer();
        Alert.alert(localize('LOGOUT'), localize('LOGOUT_MESSAGE'), [
          {
            text: localize('CANCEL'),
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: localize('OK'),
            onPress: () => {
              props.navigation.replace('Login', {reset_user: true});
            },
          },
        ]);

        break;

      default:
        break;
    }
  }

  const _renderDrawerItem = (iconName, label, extraProps = {}) => {
    return (
      <DrawerItem
        icon={({focused, color, size}) => (
          <Icon
            type={'font-awesome'}
            onPress={() => {}}
            color={color}
            size={size}
            name={iconName}
            {...extraProps}
          />
        )}
        label={label}
        onPress={() => handleSelectedDrawerItem(label)}
      />
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.headerContainer}>
        {props.user_info && props.user_info.displayName ? (
          <>
            <Avatar
              size="medium"
              rounded
              containerStyle={{marginLeft: 10}}
              source={{
                uri: isEmpty(props.user_info.photoURL)
                  ? images.user_placeholder
                  : props.user_info.photoURL,
              }}
            />
            <View
              style={[
                commonStyles.layoutDirection('column', 'center', 'center'),
                {marginLeft: 10},
              ]}>
              <Text
                style={[
                  commonStyles.textStyle('_16', 'black', 'PROXIMANOVA_BOLD'),
                  {alignSelf: 'flex-start'},
                ]}>
                {props.user_info.displayName}
              </Text>

              <Text
                style={[
                  commonStyles.textStyle(
                    '_12',
                    'placeHolderColor',
                    'PROXIMANOVA_SEMIBOLD',
                  ),
                  {alignSelf: 'flex-start'},
                ]}>
                {props.user_info.email}
              </Text>
            </View>
          </>
        ) : null}
      </View>
      {_renderDrawerItem('th-list', 'Students List')}
      {_renderDrawerItem('language', 'Change language', {type: 'entypo'})}
      {_renderDrawerItem('sign-out', 'Logout')}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: responsiveHeight(16),
    borderBottomWidth: 1,
    borderColor: 'gainsboro',
    ...commonStyles.layoutDirection('row', 'flex-start', 'center'),
  },
});

function mapStateToProps(state) {
  return {user_info: state.user_info};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
