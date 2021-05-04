import React, { useState } from 'react';
import { Button, StyleSheet, View, Picker } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from './utils/Types';

type Props = StackScreenProps<RootStackParamList, 'Selection'>;

const BreathingSpeeds = {
  SLOW: 4000,
  MEDIUM: 3000,
  FAST: 2000,
} as const;

const SelectionScreen: React.VFC<Props> = ({ navigation }) => {
  const [breathingSpeed, setBreathingSpeed] = useState(BreathingSpeeds.MEDIUM);
  const onPress = () => {
    navigation.navigate('Run', { breathingSpeed });
};
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={breathingSpeed}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue) => setBreathingSpeed(itemValue)}
      >
        <Picker.Item label='Slow' value={BreathingSpeeds.SLOW} />
        <Picker.Item label='Medium' value={BreathingSpeeds.MEDIUM} />
        <Picker.Item label='Fast' value={BreathingSpeeds.FAST} />
      </Picker>
      <Button onPress={onPress} title='Start' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SelectionScreen;
