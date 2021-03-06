import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { BreathingSpeeds } from '../screens/Selection';
import { breathing } from '../screens/utils/SoundFile';
import { useSound } from '../screens/utils/Sounds';
import useCountUp from './hooks/UseCountUp';

interface Props {
  readonly onDone: () => void;
  readonly breathingSpeed: number;
  readonly breaths: number;
}

const getPlaybackRate = (breathingSpeed: number) => {
  if (BreathingSpeeds.SLOW === breathingSpeed) {
    return 1.05;
  } else if (BreathingSpeeds.MEDIUM === breathingSpeed) {
    return 1.4;
  }
  return 2.15;
};

const Breathing: React.VFC<Props> = ({
  onDone,
  breathingSpeed = 3000,
  breaths,
}) => {
  const [counter] = useCountUp(breaths - 1, breathingSpeed, onDone);
  const scaleAnimation = useRef(new Animated.Value(0)).current;

  const { stopSound } = useSound({
    soundToPlay: breathing,
    playInitial: true,
    loop: true,
    playback: getPlaybackRate(breathingSpeed),
  });

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnimation, {
          toValue: 1,
          duration: breathingSpeed / 2,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 0,
          duration: breathingSpeed / 2,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }
    ).start();
    return () => {
      stopSound();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Breathing</Text>
      <View style={styles.test}>
        <Animated.View
          style={{
            transform: [
              {
                scale: scaleAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 4],
                }),
              },
            ],
          }}
        >
          <Text style={styles.counter}>{counter}</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  counter: {
    fontSize: 62,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  test: {
    flex: 0.65,
  },
  titleText: {
    fontSize: 42,
    flex: 0.35,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 12,
  },
});

export default Breathing;
