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
      <Text style={styles.titleText}>Recovery breath</Text>
      <Text style={styles.counter}>{amount}</Text>
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

export default RecoveryBreath;
