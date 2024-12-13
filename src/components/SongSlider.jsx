import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import ControlCenter from './ControlCenter';
import SongSlider from './SongSlider';

const App = () => {
  const [playbackObject, setPlaybackObject] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    const loadTrack = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/audio/one.mp3') 
      );
      setPlaybackObject(sound);
    };

    loadTrack();

    return () => {
      if (playbackObject) playbackObject.unloadAsync();
    };
  }, []);

  return (
    <View style={styles.container}>
      {playbackObject && <SongSlider playbackObject={playbackObject} />}
      <ControlCenter playbackObject={playbackObject} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
