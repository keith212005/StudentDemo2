import {StyleSheet} from 'react-native';
import {responsiveHeight, responsiveWidth} from '@resources';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-evenly',
  },
  btnContainer: {
    flexDirection: 'row',
    marginBottom: 100,
    alignItems: 'center',
  },
});
