import React from 'react';
import Slider from '@react-native-community/slider';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
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
    <View>
      <Text>Time: {time}</Text>
      <View style={styles.sliderContainer}>
        <Slider
          style={{ width: 200, height: 45 }}
          minimumValue={1}
          maximumValue={5}
          step={0.5}
          onValueChange={(value: number) => onValueChange({ id, time: value })}
          value={time}
        />
        <TouchableOpacity onPress={() => onDelete(id)}>
          <MaterialIcons name='highlight-remove' size={32} color='red' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    textAlign: 'left',
  },
});

export default Round;
