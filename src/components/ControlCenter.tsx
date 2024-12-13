import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons'; 

const ControlCenter = () => {
  const [playbackObject, setPlaybackObject] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const playList = [
    require('../assets/audio/one.mp3'),
    require('../assets/audio/two.mp3'),
    require('../assets/audio/three.mp3'),
    require('../assets/audio/four.mp3'),
    require('../assets/audio/five.mp3'),
  ];

  useEffect(() => {
    loadTrack(currentTrackIndex);

    return () => {
      if (playbackObject) playbackObject.unloadAsync();
    };
  }, []);

  const loadTrack = async (index: number) => {
    if (playbackObject) {
      await playbackObject.unloadAsync();
    }
    const { sound } = await Audio.Sound.createAsync(playList[index]);
    setPlaybackObject(sound);
  };

  const togglePlayback = async () => {
    if (!playbackObject) return;

    if (isPlaying) {
      await playbackObject.pauseAsync();
    } else {
      await playbackObject.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const skipToNext = async () => {
    const nextIndex = (currentTrackIndex + 1) % playList.length;
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(false);
    await loadTrack(nextIndex);
    togglePlayback();
  };

  const skipToPrevious = async () => {
    const prevIndex =
      (currentTrackIndex - 1 + playList.length) % playList.length;
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(false);
    await loadTrack(prevIndex);
    togglePlayback();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious}>
        <MaterialIcons style={styles.icon} name="skip-previous" size={40} />
      </Pressable>
      <Pressable onPress={togglePlayback}>
        <MaterialIcons
          style={styles.icon}
          name={isPlaying ? 'pause' : 'play-arrow'}
          size={75}
        />
      </Pressable>
      <Pressable onPress={skipToNext}>
        <MaterialIcons style={styles.icon} name="skip-next" size={40} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#FFFFFF',
  },
});

export default ControlCenter;
