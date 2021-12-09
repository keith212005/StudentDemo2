import ImagePicker from 'react-native-image-crop-picker';
import {responsiveWidth} from '@resources';
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
    if (type === 'camera') {
      ImagePicker.openCamera({
        ...config,
        ...extraProps,
      })
        .then(image => resolve(image))
        .catch(e => reject(e));
    } else {
      ImagePicker.openPicker({...config, ...extraProps})
        .then(image => resolve(image))
        .catch(e => reject(e));
    }
  });
};
