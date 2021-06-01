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
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = StackScreenProps<RootStackParamList, 'Selection'>;
const BreathingSpeeds = {
  SLOW: 4000,
  MEDIUM: 3000,
  FAST: 2000,
} as const;

// const BreathingPicks = Object.entries(BreathingSpeeds);

// const generateBreathingPicks = ([label, value]: [
//   string,
//   Values<typeof BreathingSpeeds>
// ]) => (
//   <Picker.Item
//     label={capitalizeFirstLetter(label)}
//     value={value}
//     key={shortid.generate()}
//   />
// );

interface BreathingPicks {
  name: any;
  speed: Values<typeof BreathingSpeeds>;
}

const breathingPicks: BreathingPicks[] = [
  {
    name: 'turtle',
    speed: BreathingSpeeds.SLOW,
  },
  {
    name: 'human',
    speed: BreathingSpeeds.MEDIUM,
  },
  {
    name: 'rabbit',
    speed: BreathingSpeeds.FAST,
  },
];

const createGenerateBreathingPicks =
  (
    currentBreathingSpeed: Values<typeof BreathingSpeeds>,
    onPress: (breathingSpeed: Values<typeof BreathingSpeeds>) => void
  ) =>
  ({ name, speed }: BreathingPicks) =>
    (
      <MaterialCommunityIcons
        key={name + speed}
        name={name}
        size={42}
        color={currentBreathingSpeed === speed ? 'black' : 'grey'}
        onPress={() => onPress(speed)}
      />
    );

const SelectionScreen: React.VFC<Props> = ({ navigation }) => {
  const [rounds, setRounds] = useState<RoundType[]>([]);
  const [breathingSpeed, setBreathingSpeed] = useState<
    Values<typeof BreathingSpeeds>
  >(BreathingSpeeds.MEDIUM);
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
    <View style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Breathing Speeds</Text>
        <View style={styles.header}>
          {breathingPicks.map(
            createGenerateBreathingPicks(breathingSpeed, setBreathingSpeed)
          )}
        </View>
        <Text style={styles.titleText}>Rounds</Text>
        <ScrollView style={styles.scrollView}>
          <View style={styles.roundContainer}>
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
          </View>
        </ScrollView>
        <View style={styles.startButtoContainer}>
          <Button onPress={onPress} title='Start' />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    margin: 16,
  },
  header: {
    justifyContent: 'space-around',
    paddingVertical: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
  },
  scrollView: {
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
  },
  roundContainer: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  startButtoContainer: {
    marginVertical: 26,
    alignItems: 'center',
  },
});

export default SelectionScreen;
