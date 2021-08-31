import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, Values } from './utils/Types';
import Round, { RoundType } from '../components/Rounds';
import { eqProps, findIndex, update, prop } from 'ramda';
import shortid from 'shortid';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from '../components/Button';
import { createIndexArray } from './utils/Array';
import { Picker } from '@react-native-picker/picker';

type Props = StackScreenProps<RootStackParamList, 'Selection'>;
export const BreathingSpeeds = {
  SLOW: 4000,
  MEDIUM: 3000,
  FAST: 2000,
} as const;

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

const breathingArray = createIndexArray(30).map((value) => value + 20);

const SelectionScreen: React.VFC<Props> = ({ navigation }) => {
  const [rounds, setRounds] = useState<RoundType[]>([]);
  const [breathingSpeed, setBreathingSpeed] = useState<
    Values<typeof BreathingSpeeds>
  >(BreathingSpeeds.MEDIUM);

  const [breaths, setBreaths] = useState<number>(30);

  const onPress = () =>
    navigation.navigate('Run', {
      breathingSpeed,
      rounds: rounds.length === 0 ? undefined : rounds,
      breaths,
    });
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
  const onDelete = (idToBeDeleted: string) => {
    setRounds((currentRounds) =>
      currentRounds.filter(({ id }) => id !== idToBeDeleted)
    );
  };
  const currentAmountOfRound = rounds.length === 0 ? 'Infinity' : rounds.length;
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Breathing Speeds</Text>
        <View style={styles.header}>
          {breathingPicks.map(
            createGenerateBreathingPicks(breathingSpeed, setBreathingSpeed)
          )}
        </View>
        <Text style={styles.titleText}>Amount of breaths</Text>
        <View style={styles.amountOfBreathsSection}>
          <View style={styles.picker}>
            <Picker
              style={{
                height: 50,
                width: 150,
              }}
              selectedValue={breaths}
              onValueChange={setBreaths}
            >
              {breathingArray.map((value) => (
                <Picker.Item
                  key={`Picker breaths: ${value}`}
                  label={String(value)}
                  value={value}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.fill}>
          <Text
            style={styles.titleText}
          >{`Rounds: ${currentAmountOfRound}`}</Text>
          <TouchableOpacity onPress={onAddRound}>
            <Ionicons name='add-circle' size={40} color='#009933' />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.roundContainer}>
            {rounds.map((round) => (
              <Round
                key={prop('id', round)}
                onValueChange={onValueChange}
                onDelete={onDelete}
                {...round}
              />
            ))}
          </View>
        </ScrollView>
        <View style={styles.startButtonContainer}>
          <CustomButton onPress={onPress} text='Start' />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  fill: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  picker: {
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 8,
  },
  amountOfBreathsSection: {
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'stretch',
    marginHorizontal: 16,
    marginVertical: 10,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  startButtonContainer: {
    marginVertical: 26,
    alignItems: 'center',
  },
});

export default SelectionScreen;
