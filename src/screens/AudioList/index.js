/* eslint-disable no-shadow */

import React, {useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

// THIRD PARTY IMPORTS
import TrackPlayer, {Capability} from 'react-native-track-player';
import {useFocusEffect} from '@react-navigation/native';

// LOCAL IMPORTS
import {tracks} from '../../constants/commonValues';
import {MusicCard} from '@components';
import MusicPlayer from '../../components/MusicPlayer/musicPlayer';

TrackPlayer.updateOptions({
  // Media controls capabilities
  capabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
    Capability.Stop,
  ],
  compactCapabilities: [Capability.Play, Capability.Pause],
});

const setupTrackPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(tracks);
  } catch (error) {
    console.log('error in setupTrackPlayer..', error);
  }
};

export const AudioList = () => {
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [trackDetails, setTrackDetails] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setupTrackPlayer();
      return () => TrackPlayer.destroy();
    }, []),
  );

  //===========================================

  const handleItemClick = async (item, index) => {
    // await TrackPlayer.skip(index);
    setShowMusicPlayer(true);
    setTrackDetails({index, item});
  };

  const _renderFlatlistItem = (item, index) => {
    return (
      <MusicCard
        item={item}
        index={index}
        onPress={(item, index) => handleItemClick(item, index)}
      />
    );
  };

  const _rederFlatList = () => {
    console.log('rendering flat list');
    return (
      <FlatList
        data={tracks}
        renderItem={item => _renderFlatlistItem(item.item, item.index)}
        keyExtractor={(item, index) => String(index)}
      />
    );
  };

  return (
    <View style={styles.container}>
      {_rederFlatList()}
      <MusicPlayer
        show={showMusicPlayer}
        trackDetails={trackDetails}
        onClose={() => setShowMusicPlayer(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
