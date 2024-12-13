import React, { useState, useEffect } from "react";
import { ActivityIndicator, SafeAreaView, StatusBar, View, StyleSheet } from "react-native";
import MusicPlayer from "../screens/MusicPlayer";

export default function Index() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    const setup = async () => {
      setIsPlayerReady(true);
    };

    setup();
  }, []);

  if (!isPlayerReady) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <MusicPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
});
