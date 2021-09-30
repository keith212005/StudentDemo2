import {StyleSheet} from 'react-native';
import {responsiveHeight, responsiveWidth} from '@resources';

export const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  renderItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
  },
  titleText: {
    textAlign: 'center',
    width: responsiveWidth(100),
  },
  itemSeparator: {
    height: 1,
    width: '100%',
    // backgroundColor: Resource.colors.gray,
  },
});
