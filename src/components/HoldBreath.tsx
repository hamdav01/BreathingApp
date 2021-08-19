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
      <Text style={styles.titleText}>Hold Breath</Text>
      <Text style={styles.counter}>{counter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  counter: {
    fontSize: 120,
    fontWeight: 'bold',
    alignSelf: 'center',
    flex: 0.65,
  },
  titleText: {
    fontSize: 42,
    fontWeight: 'bold',
    alignSelf: 'center',
    flex: 0.35,
    marginTop: 12,
  },
});

export default HoldBreath;
