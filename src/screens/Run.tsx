import React from 'react';
import { StyleSheet, View } from 'react-native';
import Breathing from '../components/Breathing';

export default function RunScreen() {
  return (
    <View style={styles.container}>
      <Breathing done={() => undefined} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});
