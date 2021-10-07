/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {responsiveHeight} from '../../resources';

// THIRD PARTY IMPORTS
import {useTheme} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {renderIcon} from '..';
import {PieChartData} from './PieChart';

const ShowChartModal = ({show, onClose}) => {
  return (
    <View style={{flex: 1}}>
      <Modal
        isVisible={show}
        animationIn="slideInUp"
        animationInTiming={500}
        animationOut="slideOutDown"
        animationOutTiming={500}
        coverScreen={true}
        statusBarTranslucent
        useNativeDriver={true}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}>
        <View
          style={{
            backgroundColor: 'white',
            paddingTop: 20,
            height: responsiveHeight(60),
            borderRadius: 10,
          }}>
          <PieChartData />
        </View>
      </Modal>
    </View>
  );
};

export const ShowChart = props => {
  const [isModalVisible, setModalVisible] = useState(false);
  useEffect(() => {}, [isModalVisible]);
  const toggleModal = () => setModalVisible(!isModalVisible);
  return (
    <>
      {renderIcon('pie-chart', 20, 'font-awesome', {
        onPress: () => toggleModal(),
        containerStyle: {padding: 12},
      })}
      <ShowChartModal show={isModalVisible} onClose={toggleModal} />
    </>
  );
};
