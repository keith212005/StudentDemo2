import React from 'react';
import {StyleSheet} from 'react-native';

import * as Resource from '@resources';

const styles = StyleSheet.create({
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
    width: Resource.responsiveWidth(90),
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
  },
  titleText: {
    color: Resource.colors.gray,
    fontSize: 24,
    padding: 10,
    textAlign: 'center',
  },
  itemSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: Resource.colors.gray,
  },
});

export {styles};
