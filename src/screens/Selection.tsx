import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, Values } from './utils/Types';
import Round, { RoundType } from '../components/Rounds';
import { eqProps, findIndex, inc, update, prop } from 'ramda';
import shortid from 'shortid';
import { capitalizeFirstLetter } from './utils/String';
import { Ionicons } from '@expo/vector-icons';

type Props = StackScreenProps<RootStackParamList, 'Selection'>;
const BreathingSpeeds = {
  SLOW: 4000,
  MEDIUM: 3000,
  FAST: 2000,
} as const;

const BreathingPicks = Object.entries(BreathingSpeeds);

const generateBreathingPicks = ([label, value]: [
  string,
  Values<typeof BreathingSpeeds>
]) => (
  <Picker.Item
    label={capitalizeFirstLetter(label)}
    value={value}
    key={shortid.generate()}
  />
);

const SelectionScreen: React.VFC<Props> = ({ navigation }) => {
  const [rounds, setRounds] = useState<RoundType[]>([]);
  const [breathingSpeed, setBreathingSpeed] = useState(BreathingSpeeds.MEDIUM);
  const onPress = () => navigation.navigate('Run', { breathingSpeed, rounds });
  const onAddRound = () => {
    setRounds((currentRounds) => [
      ...currentRounds,
      { time: 2.0, id: shortid.generate() },
    ]);
  };
  const onValueChange = (round: RoundType) => {
    const equalsId = eqProps('id', round);
    const index = findIndex(equalsId, rounds);
    setRounds(update(index, round, rounds));
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.breathingSpeedText}>Breathing speed: </Text>
        <Picker
          selectedValue={breathingSpeed}
          style={{ height: 50, width: 150, alignSelf: 'center' }}
          onValueChange={setBreathingSpeed}
        >
          {BreathingPicks.map(generateBreathingPicks)}
        </Picker>
      </View>
      <ScrollView contentContainerStyle={styles.roundContainer}>
        {rounds.map((round, index) => (
          <Round
            key={prop('id', round)}
            index={inc(index)}
            onValueChange={onValueChange}
            {...round}
          />
        ))}
        <TouchableWithoutFeedback onPress={onAddRound}>
          <Ionicons name='ios-add-circle-outline' size={60} color='black' />
        </TouchableWithoutFeedback>
      </ScrollView>
      <View style={styles.startButtoContainer}>
        <Button onPress={onPress} title='Start' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  breathingSpeedText: {
    alignSelf: 'center',
  },
  header: {
    borderBottomWidth: 1,
    justifyContent: 'center',
    marginVertical: 6,
    paddingVertical: 6,
    flexDirection: 'row',
  },
  roundContainer: {
    height: 250,
    alignItems: 'center',
    marginHorizontal: 26,
  },
  startButtoContainer: {
    marginVertical: 26,
    alignItems: 'center',
  },
});

export default SelectionScreen;
