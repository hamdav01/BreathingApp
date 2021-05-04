import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
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
  );
};

const styles = StyleSheet.create({
  container: {},
  counter: {
    fontSize: 62,
  },
  button: {},
});

export default Breathing;
