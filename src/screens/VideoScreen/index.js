/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, FlatList, Pressable, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

// LOCAL IMPORTS
import {resetNavigation} from '../../navigator';
import {MyVideoPlayer} from '../../components';
import {responsiveHeight, useGlobalStyles} from '../../resources';
import {getVideoLinks} from '../../constants';
import {styles} from './style';

export const VideoScreen = props => {
  const globalStyles = useGlobalStyles();
  const {colors} = useTheme();

  const [isVisible, setIsVisible] = useState(false);
  const [uri, setUri] = useState('');

  const ItemSeparator = () => (
    <View style={{borderWidth: 1, borderColor: colors.grey}} />
  );

  const renderItem = ({item}) => {
    return (
      <Pressable
        underlayColor={colors.white}
        onPress={() => handleSelectedVideoLink(item.link)}>
        <View style={styles.renderItemContainer}>
          <Text
            style={[globalStyles.textStyle('_18', 'text', 'PROXIMANOVA_BOLD')]}>
            {item.name}
          </Text>
        </View>
      </Pressable>
    );
  };

  const handleSelectedVideoLink = selectedUri => {
    setUri(selectedUri);
    setIsVisible(true);
  };

  return (
    <View>
      <FlatList
        data={getVideoLinks}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.code}
        ItemSeparatorComponent={ItemSeparator}
      />
      <MyVideoPlayer
        isVisible={isVisible}
        source={{uri: uri}}
        onBack={() => setIsVisible(false)}
      />
    </View>
  );
};
