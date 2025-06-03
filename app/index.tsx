'use client';
import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [sound1, setSound1] = useState(null);
  const [playing1, setPlaying1] = useState(false);
  const [sound2, setSound2] = useState(null);
  const [playing2, setPlaying2] = useState(false);

  const toggleRadio1 = async () => {
    if (sound2 && playing2) {
      await sound2.pauseAsync();
      setPlaying2(false);
    }

    if (sound1 && playing1) {
      await sound1.pauseAsync();
      setPlaying1(false);
    } else {
      if (!sound1) {
        const { sound } = await Audio.Sound.createAsync(
          { uri: 'http://servidor17.brlogic.com:7450/live?1748956338764' },
          { shouldPlay: true }
        );
        setSound1(sound);
        setPlaying1(true);
      } else {
        await sound1.playAsync();
        setPlaying1(true);
      }
    }
  };

  const toggleRadio2 = async () => {
    if (sound1 && playing1) {
      await sound1.pauseAsync();
      setPlaying1(false);
    }

    if (sound2 && playing2) {
      await sound2.pauseAsync();
      setPlaying2(false);
    } else {
      if (!sound2) {
        const { sound } = await Audio.Sound.createAsync(
          { uri: 'http://www.radioideal.net:8021/stream?1748956650982' },
          { shouldPlay: true }
        );
        setSound2(sound);
        setPlaying2(true);
      } else {
        await sound2.playAsync();
        setPlaying2(true);
      }
    }
  };

  useEffect(() => {
    return () => {
      sound1 && sound1.unloadAsync();
      sound2 && sound2.unloadAsync();
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📻 Rádios de Morada Nova</Text>

      <View style={styles.radioBlock}>
        <Text style={styles.radioTitle}>Uirapuru Jaguaribana 100.7 FM</Text>
        <TouchableOpacity style={styles.button} onPress={toggleRadio1}>
          <Text style={styles.buttonText}>
            {playing1 ? '⏸️ Pausar' : '▶️ Ouvir Agora'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.radioBlock}>
        <Text style={styles.radioTitle}>Vale 92.1 FM</Text>
        <TouchableOpacity style={styles.button} onPress={toggleRadio2}>
          <Text style={styles.buttonText}>
            {playing2 ? '⏸️ Pausar' : '▶️ Ouvir Agora'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fef6e4',
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    marginBottom: 30,
    color: '#001858',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  radioBlock: {
    marginBottom: 40,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  radioTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#001858',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#f582ae',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
  },
});
