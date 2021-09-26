/* eslint-disable react/react-in-jsx-scope */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

export default function GoogleMap(props) {
  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    height: 200,
    width: '100%',
    borderWidth: 1,
  },
  map: {
    // borderWidth: 1,
    ...StyleSheet.absoluteFillObject,
  },
});
