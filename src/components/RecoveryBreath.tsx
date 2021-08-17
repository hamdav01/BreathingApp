import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useCountUp from './hooks/UseCountUp';

const countUpAmount = 15;
const intervalTime = 1000;

interface Props {
  onDone: () => void;
}

const RecoveryBreath: React.VFC<Props> = ({ onDone }) => {
  const [counter] = useCountUp(countUpAmount, intervalTime, onDone);
  const amount = 16 - counter;
  return (
    <View style={styles.container}>
      <Text style={styles.counter}>{amount}</Text>
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

export default RecoveryBreath;
