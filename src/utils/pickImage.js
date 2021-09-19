import ImagePicker from 'react-native-image-crop-picker';
import {responsiveWidth} from '@resources';
import {isValueOneOfThem} from './utilities';
import {localize} from '@languages';

var config = {
  cropping: true,
  mediaType: 'photo',
  hideBottomControls: true,
  compressImageQuality: 0.7,
  useFrontCamera: true,
};

var extraStyle = {
  height: responsiveWidth(70),
  width: responsiveWidth(70),
};

export const getImageFromMobile = (type, extraProps = extraStyle) => {
  return new Promise((resolve, reject) => {
    if (type == 'camera') {
      ImagePicker.openCamera({
        ...config,
        ...extraProps,
      })
        .then(image => {
          resolve(image);
        })
        .catch(e => {
          console.log('eeee>>>', e);
          handleExaptions(e, 'camera').then(error => reject(error));
        });
    } else {
      ImagePicker.openPicker({...config, ...extraProps})
        .then(image => {
          resolve(image);
        })
        .catch(e => {
          console.log('eeee>>>', e);
          handleExaptions(e, type).then(error => reject(error));
        });
    }
  });
};

const handleExaptions = (e, type) => {
  return new Promise((resolve, reject) => {
    if (
      isValueOneOfThem(e.code, [
        'E_PERMISSION_MISSING',
        'E_PICKER_NO_CAMERA_PERMISSION',
      ])
    ) {
      if (type == 'camera') {
        resolve('MISSING_CAMERA_PERMISSION');
      } else {
        resolve('MISSING_GALLERY_PERMISSION');
      }
    } else {
      alert(localize('SOMETHING_WENT_WRONG'));
    }

    resolve(false);
  });
};
