import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Linking,
  Platform,
  Alert,
  Pressable,
} from 'react-native';

// THIRD PARTY IMPORTS
import {Button} from 'react-native-elements';
import Modal from 'react-native-modal';

// LOCAL IMPORTS
import {localize} from '@languages';
import {
  responsiveHeight,
  responsiveWidth,
  commonStyles,
  images,
  colors,
} from '@resources';
import {getImageFromMobile, isSameVariable} from '@utils';
import {renderIcon} from '../commonViews';

export default class ImagePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      permission_dialog: false,
    };
  }

  onPress(fromCameraOrGallery) {
    getImageFromMobile(fromCameraOrGallery)
      .then(imageData => this.props.image_path(imageData))
      .catch(err => {
        if (err.code === 'E_NO_CAMERA_PERMISSION') {
          Alert.alert(
            'Permission',
            "Please allow Camera permission from setting for this app, otherwise app can't access your Camera and photos.",
            [
              {text: 'Go To Setting', onPress: () => Linking.openSettings()},
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
            ],
            {
              cancelable: true,
            },
          );
        } else if (err.code === 'E_NO_LIBRARY_PERMISSION') {
          Alert.alert(
            'Permission',
            "Please allow storage permission from setting for this app, otherwise app can't access your Camera and photos.",
            [
              {text: 'Go To Setting', onPress: () => Linking.openSettings()},
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
            ],
            {
              cancelable: true,
            },
          );
        }
      });
  }

  // componentDidUpdate(nextProps, nextState) {
  //   if (!isSameVariable(nextProps.show, this.props.show)) {
  //     this.setState({show: nextProps.show});
  //   }
  //   if (!isSameVariable(nextState.show, this.state.show)) {
  //     this.props.onChangeData(nextState.show);
  //   }
  // }

  render() {
    const {show, outsidePress, onClose, onPressPositive, height, width} =
      this.props;

    return (
      <>
        <Modal
          style={{margin: 0}}
          isVisible={this.props.show}
          animationIn="slideInUp"
          backdropTransitionOutTiming={0}
          statusBarTranslucent>
          <Pressable
            onPress={() => this.props.onClose()}
            style={styles.dialogContainer}>
            <View style={styles.picDialogContainer}>
              <Pressable
                style={styles.buttonContainer}
                onPress={() => {
                  this.props.onClose();
                  setTimeout(() => this.onPress('camera'), 1000);
                }}>
                {renderIcon(images.camera, 30, {
                  marginHorizontal: responsiveWidth(5),
                })}
                <Text style={styles.buttonTextStyle}>{localize('CAMERA')}</Text>
              </Pressable>

              <Pressable
                style={styles.buttonContainer}
                onPress={() => {
                  this.props.onClose();
                  setTimeout(() => this.onPress('gallery'), 1000);
                }}>
                {renderIcon(images.gallery, 30, {
                  marginHorizontal: responsiveWidth(5),
                  tintColor: colors.darkGray,
                })}
                <Text style={styles.buttonTextStyle}>
                  {localize('GALLERY')}
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      </>
    );
  }
}

const styles = StyleSheet.create({
  dialogContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  picDialogContainer: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    width: responsiveWidth(100),
    height: responsiveHeight(20),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    ...commonStyles.layoutDirection('row', 'flex-start', 'center'),
    width: responsiveWidth(100),
    paddingVertical: responsiveHeight(2),
  },
  buttonTextStyle: {
    ...commonStyles.textStyle('TXT_14', 'PROXIMANOVA_REGULAR'),
  },
});
