/* eslint-disable no-sparse-arrays */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, FlatList, Pressable, SafeAreaView} from 'react-native';

// THIRD PARTY IMPORTS
import _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {useTheme} from '@react-navigation/native';
import {Divider} from 'native-base';

// LOCAL IMPORTS
import {styles} from './style';
import {renderImage} from '@components';
import {changeLanguage} from '@languages';
import {actionCreators} from '@actions';
import {getLanguages} from '@constants';
import {images} from '@resources';
import {isEmpty, isEmptyObject} from '@utils';
import {resetNavigation} from '@navigator';
import {useGlobalStyles} from '../../resources';

const Language = props => {
  const globalStyles = useGlobalStyles();
  const {colors} = useTheme();

  const [selectedLanguage, setSelectedLanguage] = useState(
    isEmpty(props.language) ? undefined : props.language,
  );

  this.handleLanguageChange = newValue => {
    setSelectedLanguage(newValue);
    props.setAppLanguage(newValue);
    changeLanguage(newValue);
    resetNavigation(
      isEmptyObject(props.user_info) ? 'Login' : 'DrawerNavigator',
    );
  };

  this.renderItem = ({item}) => {
    return (
      <Pressable
        // activeOpacity={0.6}
        style={[
          globalStyles.layoutDirection('row', 'space-between', 'center'),
          {padding: 20},
          ,
        ]}
        onPress={() => this.handleLanguageChange(item.code)}>
        <Text
          style={[
            globalStyles.textStyle('_18', 'text', 'PROXIMANOVA_REGULAR'),
          ]}>
          {item.language}
        </Text>
        {selectedLanguage === item.code &&
          renderImage(images.check, 25, {tintColor: 'green'})}
      </Pressable>
    );
  };

  const ItemSeparator = () => <Divider />;

  return (
    <SafeAreaView>
      {_.isEmpty(props.language) && (
        <>
          <Divider />
          <View style={styles.titleBar}>
            <Text
              style={[
                globalStyles.textStyle('_24', 'text', 'PROXIMANOVA_BOLD'),
                {...styles.titleText},
              ]}>
              Select Language
            </Text>
          </View>
        </>
      )}
      <FlatList
        data={getLanguages}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => item.code}
        ItemSeparatorComponent={ItemSeparator}
      />
    </SafeAreaView>
  );
};

const matchStateToProps = state => {
  console.log('state in langusge', state);
  return {
    language: state.app_lang.language,
    user_info: state.user_info,
    isOpenedFirstTime: state.isOpenedFirstTime,
  };
};
const matchDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(matchStateToProps, matchDispatchToProps)(Language);
