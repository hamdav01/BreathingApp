import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useCountUp from './hooks/UseCountUp';

const countUpAmount = 15;
const intervalTime = 1000;

interface Props {
  onDone: () => void;
}

const HoldBreath: React.VFC<Props> = ({ onDone }) => {
  const [counter] = useCountUp(countUpAmount, intervalTime, onDone);
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
