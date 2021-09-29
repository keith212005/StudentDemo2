import React from 'react';
import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {
  colors,
  fontSize,
  fonts,
  responsiveHeight,
  responsiveWidth,
} from '@resources';

export const commonStyles = StyleSheet.create({
  textStyle: (
    size = '_14',
    color = 'textPrimaryColor',
    type = 'PROXIMANOVA_REGULAR',
    includeFontPadding,
  ) => {
    return {
      color: colors[color],
      fontSize: fontSize[size],
      fontFamily: fonts[type],
      includeFontPadding,
    };
  },
  layoutDirection: (flex, justifyContent, alignItems) => {
    return {
      flexDirection: flex,
      alignItems: alignItems,
      justifyContent: justifyContent,
    };
  },
  squareLayout: size => {
    return {
      width: size,
      aspectRatio: 1,
    };
  },
  imageHolderLeftRightSytle: (
    backgroundColor = colors.blue,
    width = responsiveWidth(33),
    height = responsiveHeight(4.5),
  ) => {
    return {
      width: width,
      height: height,
      backgroundColor: backgroundColor,
    };
  },
});

const getGlobalStyles = props =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: props.colors.backgroundColor,
    },
    textStyle: (
      size = '_14',
      color = 'textPrimaryColor',
      type = 'PROXIMANOVA_REGULAR',
      includeFontPadding,
    ) => {
      return {
        color: props.colors[color],
        fontSize: fontSize[size],
        fontFamily: fonts[type],
        includeFontPadding,
      };
    },
    layoutDirection: (flex, justifyContent, alignItems) => {
      return {
        flexDirection: flex,
        alignItems: alignItems,
        justifyContent: justifyContent,
      };
    },
    squareLayout: size => {
      return {
        width: size,
        aspectRatio: 1,
      };
    },
  });

export function useGlobalStyles() {
  const {colors} = useTheme();

  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);

  return styles;
}
