import { StackScreenProps } from '@react-navigation/stack';
import { compose } from 'ramda';
import React, { useEffect, useReducer, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Breathing from '../components/Breathing';
import CustomButton from '../components/Button';
import HoldBreath from '../components/HoldBreath';
import RecoveryBreath from '../components/RecoveryBreath';
import {
  breathReducer,
  setNextBreathingStage,
  RunStage,
  getUpcomingRound,
} from './reducers/BreathingReducer';
import { convertMinuteIntoSeconds } from './utils/Number';
import { RootStackParamList } from './utils/Types';

type Props = StackScreenProps<RootStackParamList, 'Run'>;

interface GetRunStateConfig {
  breathingSpeed: number;
  dispatchNextStage: () => void;
  time: number;
}
const getRunState = (
  stage: RunStage,
  { breathingSpeed, dispatchNextStage, time }: GetRunStateConfig
) => {
  switch (stage) {
    case RunStage.BREATHING:
      return (
        <Breathing breathingSpeed={breathingSpeed} onDone={dispatchNextStage} />
      );
    case RunStage.HOLDING_BREATH:
      return <HoldBreath time={time} onDone={dispatchNextStage} />;
    case RunStage.RECOVERY_BREATH:
      return <RecoveryBreath onDone={dispatchNextStage} />;
  }
};

export const RunScreen: React.VFC<Props> = ({ route, navigation }) => {
  const { breathingSpeed: initBreathingSpeed, rounds } = route.params;
  const [breathingState, dispatch] = useReducer(breathReducer, {
    breathingSpeed: initBreathingSpeed,
    currentStage: RunStage.BREATHING,
    ...getUpcomingRound(rounds),
  });
  const { breathingSpeed, currentRound } = breathingState;
  const dispatchNextStage = compose(dispatch, setNextBreathingStage);

  useEffect(() => {
    if (breathingState.currentRound === undefined) {
      navigation.navigate('Selection');
    }
  }, [breathingState]);

  const runComponent = getRunState(breathingState.currentStage, {
    breathingSpeed,
    dispatchNextStage,
    time: convertMinuteIntoSeconds(currentRound?.time ?? 1.3),
  });

  return (
    <View style={styles.container}>
      {runComponent}
      <View style={styles.buttonContainer}>
        <CustomButton onPress={() => dispatchNextStage()} text='Next' />
        <CustomButton
          onPress={() => navigation.pop()}
          text='Quit'
          backgroundColor='#a32727'
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    bottom: 20,
    position: 'absolute',
    width: '100%',
    justifyContent: 'space-evenly',
  },
});

export default RunScreen;
