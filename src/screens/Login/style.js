import {StyleSheet} from 'react-native';
import {responsiveWidth, responsiveHeight, commonStyles} from '@resources';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  socialLoginButtonsContainer: {
    width: responsiveWidth(100),
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-evenly',
  },
  forgotPassword: {
    ...commonStyles.textStyle(30, 'black', 'PROXIMANOVA_SEMIBOLD'),
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 10,
  },
  // logoText: {
  //   ...commonStyles.textStyle('_32', 'hot_red', 'PROXIMANOVA_SEMIBOLD'),
  // },
});
