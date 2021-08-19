import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import useCountUp from './hooks/UseCountUp';

const countUpAmount = 29;
interface Props {
  onDone: () => void;
  readonly breathingSpeed: number;
}

const Breathing: React.VFC<Props> = ({ onDone, breathingSpeed = 3000 }) => {
  const [counter] = useCountUp(countUpAmount, breathingSpeed, onDone);
  const scaleAnimation = useRef(new Animated.Value(0)).current;

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
