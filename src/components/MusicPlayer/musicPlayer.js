/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';

// LOCAL IMPORTS
import {
  responsiveHeight,
  responsiveWidth,
  useGlobalStyles,
} from '../../resources';
import {MusicSlider} from '../Sliders';
import ElapsedTimer from './elapsedTimer';
import TrackDuration from './trackDuration';

// THIRD PARTY IMPORTS
import TrackPlayer from 'react-native-track-player';
import Modal from 'react-native-modal';
import {useTheme} from '@react-navigation/native';
import PlayAndPauseButton from './playAndPauseButton';
import SkipToNextButton from './skipToNextButton';
import TrackInfo from './trackInfo';
import SkipToPreviousButton from './skipToPreviousButton';

const MusicPlayer = props => {
  const globalStyles = useGlobalStyles();
  const {colors} = useTheme();

  if (props.show) {
    TrackPlayer.skip(props.trackDetails.index);
    setTimeout(() => {
      TrackPlayer.play();
    }, 200);
  } else {
    TrackPlayer.pause();
  }

  const _renderSlider = () => {
    return (
      <View
        style={[globalStyles.layoutDirection('row', 'space-evenly', 'center')]}>
        <ElapsedTimer />
        <View style={{width: responsiveWidth(60), paddingVertical: 10}}>
          <MusicSlider />
        </View>
        <TrackDuration />
      </View>
    );
  };

  const _renderControls = () => {
    return (
      <View
        style={[globalStyles.layoutDirection('row', 'space-evenly', 'center')]}>
        <SkipToPreviousButton />
        <PlayAndPauseButton />
        <SkipToNextButton />
      </View>
    );
  };

  return (
    <View>
      <Modal
        style={{margin: 0}}
        isVisible={props.show}
        animationIn="slideInUp"
        animationInTiming={500}
        animationOut="slideOutDown"
        animationOutTiming={500}
        coverScreen={true}
        backdropTransitionOutTiming={0}
        statusBarTranslucent
        useNativeDriver={true}
        onBackdropPress={() => props.onClose()}
        onBackButtonPress={() => props.onClose()}>
        <View onPress={() => {}} style={styles.dialogContainer(globalStyles)}>
          <View style={styles.playerDialogContainer(colors, globalStyles)}>
            <TrackInfo />
            {_renderSlider()}
            {_renderControls()}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  dialogContainer: globalStyles => ({
    flex: 1,
    ...globalStyles.layoutDirection('column', 'flex-end', 'flex-start'),
  }),
  playerDialogContainer: colors => ({
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderColor: colors.orange,
    width: responsiveWidth(100),
    height: responsiveHeight(40),
    backgroundColor: colors.white,
  }),
});
