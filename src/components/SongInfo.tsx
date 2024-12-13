import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

type SongInfoProps = {
  track: {
    title: string;
    artist: string;
    album: string;
  } | null;
};

const SongInfo = ({ track }: SongInfoProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>
          {track?.title || "Unknown Title"}
        </Text>
        <Text style={styles.artist}>
          {track?.artist || "Unknown Artist"} . {track?.album || "Unknown Album"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  name: {
    marginBottom: 8,
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
  },
  artist: {
    color: '#d9d9d9',
    textAlign: 'center',
  },
});

export default SongInfo;
