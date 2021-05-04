import { StackScreenProps } from '@react-navigation/stack';
import { compose } from 'ramda';
import React, { useReducer, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Breathing from '../components/Breathing';
import HoldBreath from '../components/HoldBreath';
import RecoveryBreath from '../components/RecoveryBreath';
import {
  breathReducer,
  setNextBreathingStage,
  initBreathState,
  RunStage,
} from './reducers/BreathingReducer';
import { RootStackParamList } from './utils/Types';

type Props = StackScreenProps<RootStackParamList, 'Run'>;

interface GetRunStateConfig {
  breathingSpeed: number;
  onDone: (x0: RunStage) => void;
}
const getRunState = (
  nextStage: RunStage,
  { breathingSpeed, onDone }: GetRunStateConfig
) => {
  switch (nextStage) {
    case RunStage.BREATHING:
      return (
        <Breathing
          breathingSpeed={breathingSpeed}
          onDone={() => onDone(RunStage.HOLDING_BREATH)}
        />
      );
    case RunStage.HOLDING_BREATH:
      return <HoldBreath onDone={() => onDone(RunStage.RECOVERY_BREATH)} />;
    case RunStage.RECOVERY_BREATH:
      return <RecoveryBreath onDone={() => onDone(RunStage.BREATHING)} />;
  }
};

export const RunScreen: React.VFC<Props> = ({ route, navigation }) => {
  const { breathingSpeed } = route.params;
  const [breathingState, dispatch] = useReducer(breathReducer, initBreathState);
  const onDone = compose(dispatch, setNextBreathingStage);
  const runComponent = getRunState(breathingState.currentStage, {
    breathingSpeed,
    onDone,
  });

  return (
    <View style={styles.container}>
      {runComponent}
      <Button
        onPress={() => {
          navigation.pop();
        }}
        title='Quit'
      />
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

export default RunScreen;
