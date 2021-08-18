import React from 'react';
import Slider from '@react-native-community/slider';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ButtonSlider from './ButtonSlider';
export interface RoundType {
  time: number;
  id: string;
}

interface Props extends RoundType {
  readonly onValueChange: (round: RoundType) => void;
  readonly onDelete: (id: string) => void;
}

const Round: React.VFC<Props> = ({ id, time, onValueChange, onDelete }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Time: {time}</Text>
      <View style={styles.sliderContainer}>
        <ButtonSlider
          activeValue={time}
          onPress={(value: number) => onValueChange({ id, time: value })}
        />
        <TouchableOpacity onPress={() => onDelete(id)}>
          <MaterialIcons name='highlight-remove' size={38} color='red' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Round;
