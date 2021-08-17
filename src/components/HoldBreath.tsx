import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useCountUp from './hooks/UseCountUp';

const intervalTime = 1000;

interface Props {
  onDone: () => void;
  time: number;
}

const HoldBreath: React.VFC<Props> = ({ onDone, time }) => {
  const timeToHoldBreath = time === -1 ? Infinity : time;
  const [counter] = useCountUp(timeToHoldBreath - 1, intervalTime, onDone);
  return (
    <View style={styles.container}>
      <Text style={styles.counter}>{counter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  counter: {
    fontSize: 62,
  },
  button: {},
});

export default HoldBreath;
