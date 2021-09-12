import { StackScreenProps } from '@react-navigation/stack';
import { compose } from 'ramda';
import React, { useEffect, useReducer } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Breathing from '../components/Breathing';
import CustomButton from '../components/Button';
import HoldBreath from '../components/HoldBreath';
import RecoveryBreath from '../components/RecoveryBreath';
import {
  breathReducer,
  setNextBreathingStage,
  RunStage,
  getUpcomingRound,
  setSaveValue,
  getSavedRounds,
} from './reducers/BreathingReducer';
import { convertMinuteIntoSeconds } from './utils/Number';
import { RootStackParamList } from './utils/Types';
import { useSound } from './utils/Sounds';
import { gong, relaxingAmbience } from './utils/SoundFile';

type Props = StackScreenProps<RootStackParamList, 'Run'>;

interface GetRunStateConfig {
  breathingSpeed: number;
  dispatchNextStage: () => void;
  time: number;
  dispatchSaveValue: (saveValue: number) => void;
  breaths: number;
}
const getRunState = (
  stage: RunStage,
  {
    breathingSpeed,
    dispatchNextStage,
    time,
    breaths,
    dispatchSaveValue,
  }: GetRunStateConfig
) => {
  switch (stage) {
    case RunStage.BREATHING:
      return (
        <Breathing
          breaths={breaths}
          breathingSpeed={breathingSpeed}
          onDone={dispatchNextStage}
        />
      );
    case RunStage.HOLDING_BREATH:
      return (
        <HoldBreath
          saveValue={dispatchSaveValue}
          time={time}
          onDone={dispatchNextStage}
        />
      );
    case RunStage.RECOVERY_BREATH:
      return <RecoveryBreath onDone={dispatchNextStage} />;
  }
};

export const RunScreen: React.VFC<Props> = ({ route, navigation }) => {
  const { breathingSpeed: initBreathingSpeed, rounds, breaths } = route.params;
  const [breathingState, dispatch] = useReducer(breathReducer, {
    breathingSpeed: initBreathingSpeed,
    currentStage: RunStage.BREATHING,
    savedRounds: [],
    ...getUpcomingRound(rounds),
  });
  const { breathingSpeed, currentRound } = breathingState;
  const dispatchNextStage = compose(dispatch, setNextBreathingStage);
  const dispatchSaveValue = compose(dispatch, setSaveValue);
  useSound({ soundToPlay: relaxingAmbience, playInitial: true });
  const { playSound: playGongSound } = useSound({
    soundToPlay: gong,
    volume: 0.3,
  });
  useEffect(() => {
    playGongSound();
    const onNavigate = () => {
      navigation.navigate('Summary', {
        rounds: getSavedRounds(breathingState),
      });
    };
    if (breathingState.currentRound === undefined) {
      onNavigate();
    }
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onNavigate}>
          <Text style={styles.finish}>Quit</Text>
        </TouchableOpacity>
      ),
    });
  }, [breathingState]);

  const runComponent = getRunState(breathingState.currentStage, {
    breathingSpeed,
    dispatchSaveValue,
    dispatchNextStage,
    breaths,
    time: convertMinuteIntoSeconds(currentRound?.time ?? 1.3),
  });

  return (
    <View style={styles.container}>
      {runComponent}
      <View style={styles.buttonContainer}>
        <CustomButton onPress={() => dispatchNextStage()} text='Next' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  finish: {
    color: '#a32727',
    marginRight: 4,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    bottom: 20,
    position: 'absolute',
    alignSelf: 'center',
  },
});

export default RunScreen;
