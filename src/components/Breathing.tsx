import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import useCountUp from './hooks/UseCountUp';

const countUpAmount = 30;
const intervalTime = 3000;
const animationDuration = intervalTime / 2;

interface Props {
  readonly done: () => void;
}

const Breathing: React.VFC<Props> = ({ done }) => {
  const [counter] = useCountUp(countUpAmount, intervalTime, done);
  const scaleAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnimation, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 0,
          duration: animationDuration,
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
