import React from 'react';
import Slider from '@react-native-community/slider';
import { Text, View, StyleSheet } from 'react-native';

export interface RoundType {
  time: number;
  id: string;
}

interface Props extends RoundType {
  readonly onValueChange: (round: RoundType) => void;
  readonly index: number;
}

const Round: React.VFC<Props> = ({ id, time, onValueChange, index }) => {
  return (
    <View>
      <View style={styles.textContainer}>
        <Text>Round: {index}</Text>
        <Text style={styles.container}>Time: {time}</Text>
      </View>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={1}
        maximumValue={5}
        step={0.5}
        onValueChange={(value) => onValueChange({ id, time: value })}
        value={time}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Round;
