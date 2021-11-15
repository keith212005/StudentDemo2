import {StyleSheet} from 'react-native';
import {responsiveHeight, responsiveWidth} from '@resources';

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  buttonContainer: {
    width: responsiveWidth(20),
    alignSelf: 'flex-end',
    margin: responsiveWidth(5),
  },
});
