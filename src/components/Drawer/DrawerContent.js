/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, DevSettings} from 'react-native';

// THIRD PARTY IMPORTS
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Avatar} from 'react-native-elements';

// LOCAL IMPORTS
import {responsiveHeight, useGlobalStyles} from '@resources';
import {actionCreators} from '@actions';
import {localize} from '@languages';
import {isEmpty} from '@utils';
import {images} from '@resources';
import {navigate} from '@navigator';
import {resetNavigation} from '../../navigator';
import {Preferences} from './preferences';
import {Divider} from 'native-base';

const DrawerContent = props => {
  const globalStyles = useGlobalStyles();

  function handleSelectedDrawerItem(label) {
    switch (label) {
      case localize('STUDENTS_LIST'):
        navigate('StudentList');
        break;
      case localize('CHANGE_LANGUAGE'):
        navigate('Language');
        break;
      case localize('LOGOUT'):
        props.navigation.closeDrawer();
        Alert.alert(localize('LOGOUT'), localize('LOGOUT_MESSAGE'), [
          {text: localize('CANCEL'), onPress: () => {}},
          {
            text: localize('OK'),
            onPress: () => resetNavigation('Login', {reset_user: true}),
          },
        ]);
        break;
      case localize('NOTIFICATION_DEMO'):
        navigate('Notifications');
        break;

      case localize('VIDEO_PLAYER'):
        navigate('VideoScreen');
        break;

      case localize('MUSIC_PLAYER'):
        navigate('Musicplayer');
        break;

      case 'SqliteDemo':
        navigate('SqliteDemo');
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
            size={20}
            name={iconName}
            {...extraProps}
          />
        )}
        label={label}
        onPress={() => handleSelectedDrawerItem(label)}
      />
    );
  };

  const _renderPreferences = () => {
    return (
      <Preferences
        isDarkModeOn={props.isDarkTheme}
        onValueChange={value => {
          console.log(value);
          props.setDarkTheme(value);
        }}
      />
    );
  };

  const _renderHeader = () => {
    return (
      <View
        style={[
          globalStyles.layoutDirection('row', 'flex-start', 'center'),
          {...styles.headerContainer},
        ]}>
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
                globalStyles.layoutDirection('column', 'center', 'center'),
                {marginLeft: 10},
              ]}>
              <Text
                style={[
                  globalStyles.textStyle('_16', 'text', 'PROXIMANOVA_BOLD'),
                  {alignSelf: 'flex-start'},
                ]}>
                {props.user_info.displayName}
              </Text>

              <Text
                style={[
                  globalStyles.textStyle('_12', 'text', 'PROXIMANOVA_SEMIBOLD'),
                  {alignSelf: 'flex-start'},
                ]}>
                {props.user_info.email}
              </Text>
            </View>
          </>
        ) : null}
      </View>
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* Render Header */}
      {_renderHeader()}
      {/* Render Student List screen*/}
      {_renderDrawerItem('th-list', localize('STUDENTS_LIST'))}
      {/* Render Change Language screen */}
      {_renderDrawerItem('language', localize('CHANGE_LANGUAGE'))}
      {/* Render Notificaiton screen */}
      {_renderDrawerItem('bell', localize('NOTIFICATION_DEMO'))}
      {/* Render Video screen */}
      {_renderDrawerItem('video-camera', localize('VIDEO_PLAYER'))}
      {/* Render Video screen */}
      {_renderDrawerItem('audio-description', localize('MUSIC_PLAYER'))}

      {/* Render SQlite Demo */}
      {_renderDrawerItem('database', 'SqliteDemo')}
      {/* Render Sign out */}
      {_renderDrawerItem('sign-out', localize('LOGOUT'))}
      <Divider />
      {/* Render Preferences */}
      {_renderPreferences()}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: responsiveHeight(16),
    borderBottomWidth: 1,
    borderColor: 'gainsboro',
  },
});

function mapStateToProps(state) {
  return {user_info: state.user_info, isDarkTheme: state.isDarkTheme};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
