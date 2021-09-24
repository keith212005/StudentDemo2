import {StyleSheet} from 'react-native';
import {responsiveHeight, responsiveWidth, commonStyles} from '@resources';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 20,
    height: responsiveHeight(100),
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(2),
  },
  titleStyle: {
    ...commonStyles.textStyle(
      '_14',
      'placeholderColor',
      'PROXIMANOVA_SEMIBOLD',
    ),
  },
});
