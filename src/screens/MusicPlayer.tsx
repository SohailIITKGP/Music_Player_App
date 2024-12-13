import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import { playListData } from "../app/constants";

const { width } = Dimensions.get("window");

const MusicPlayer = () => {
  const [playbackObject, setPlaybackObject] = useState<Audio.Sound | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const loadTrack = async (index: number) => {
    try {
      if (playbackObject) {
        await playbackObject.stopAsync();
        await playbackObject.unloadAsync();
      }

      const track = playListData[index];
      const { sound } = await Audio.Sound.createAsync({ uri: track.url });
      setPlaybackObject(sound);
      setCurrentTrackIndex(index);

      await sound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error loading track:", error);
    }
  };

  useEffect(() => {
    loadTrack(currentTrackIndex);

    return () => {
      if (playbackObject) {
        playbackObject.unloadAsync();
      }
    };
  }, []);

  const togglePlayPause = async () => {
    if (playbackObject) {
      if (isPlaying) {
        await playbackObject.pauseAsync();
      } else {
        await playbackObject.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipToNext = async () => {
    const nextIndex = (currentTrackIndex + 1) % playListData.length;
    await loadTrack(nextIndex);
  };

  const skipToPrevious = async () => {
    const prevIndex = (currentTrackIndex - 1 + playListData.length) % playListData.length;
    await loadTrack(prevIndex);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.albumArtImg}
        source={{ uri: playListData[currentTrackIndex].artwork }}
      />

      <Text style={styles.trackTitle}>
        {playListData[currentTrackIndex].title}
      </Text>
      <Text style={styles.trackArtist}>
        {playListData[currentTrackIndex].artist}
      </Text>

      <View style={styles.controls}>
        <TouchableOpacity onPress={skipToPrevious} style={styles.controlButton}>
          <Text style={styles.controlText}>⏮️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayPause} style={styles.controlButton}>
          <Text style={styles.controlText}>{isPlaying ? "⏸️" : "▶️"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={skipToNext} style={styles.controlButton}>
          <Text style={styles.controlText}>⏭️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    paddingVertical: 20,
  },
  albumArtImg: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#ffa500",
  },
  trackTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  trackArtist: {
    fontSize: 18,
    color: "#ffa500",
    marginBottom: 30,
    textAlign: "center",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
  controlButton: {
    backgroundColor: "#ffa500",
    padding: 15,
    borderRadius: 50,
  },
  controlText: {
    fontSize: 24,
    color: "#fff",
  },
});

export default MusicPlayer;
