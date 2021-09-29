/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';

// THIRD PARTY IMPORTS
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// LOCAL IMPORTS
import {styles} from './style';
import {renderIcon} from '@components';
import {changeLanguage} from '@languages';
import {actionCreators} from '@actions';
import {getLanguages} from '@constants';
import {images, colors} from '@resources';
import {isEmpty, isEmptyObject} from '@utils';
import {resetNavigation} from '@navigator';
import {useGlobalStyles} from '../../resources';

const ItemSeparator = () => (
  <View
    style={{borderWidth: 1, borderColor: colors.unfocusBorder_opacity_low}}
  />
);

const Language = props => {
  const globalStyles = useGlobalStyles();

  const [selectedLanguage, setSelectedLanguage] = useState(
    isEmpty(props.language) ? undefined : props.language,
  );

  this.handleLanguageChange = newValue => {
    setSelectedLanguage(newValue);
    props.setAppLanguage(selectedLanguage);
    changeLanguage(newValue);
    resetNavigation(
      isEmptyObject(props.user_info) ? 'Login' : 'DrawerNavigator',
    );
  };

  this.renderItem = ({item}) => {
    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => this.handleLanguageChange(item.code)}>
        <View style={styles.renderItemContainer}>
          <Text style={{fontSize: 18}}>{item.language}</Text>
          {selectedLanguage === item.code
            ? renderIcon(images.check, 30, {tintColor: 'green'})
            : null}
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={[{backgroundColor: 'white'}]}>
      <View style={styles.titleBar}>
        <Text
          style={[
            globalStyles.textStyle('_24', 'text', 'PROXIMANOVA_BOLD'),
            {...styles.titleText},
          ]}>
          Select Language
        </Text>
      </View>
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
  return {
    language: state.app_lang.language,
    user_info: state.user_info,
    isOpenedFirstTime: state.isOpenedFirstTime,
  };
};
const matchDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(matchStateToProps, matchDispatchToProps)(Language);
