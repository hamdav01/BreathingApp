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
  dispatchNextStage: () => void;
}
const getRunState = (
  nextStage: RunStage,
  { breathingSpeed, dispatchNextStage }: GetRunStateConfig
) => {
  switch (nextStage) {
    case RunStage.BREATHING:
      return (
        <Breathing breathingSpeed={breathingSpeed} onDone={dispatchNextStage} />
      );
    case RunStage.HOLDING_BREATH:
      return <HoldBreath onDone={dispatchNextStage} />;
    case RunStage.RECOVERY_BREATH:
      return <RecoveryBreath onDone={dispatchNextStage} />;
  }
};

export const RunScreen: React.VFC<Props> = ({ route, navigation }) => {
  const { breathingSpeed, rounds } = route.params;
  const [breathingState, dispatch] = useReducer(breathReducer, {
    ...initBreathState,
    rounds,
  });
  const dispatchNextStage = compose(dispatch, setNextBreathingStage);
  const runComponent = getRunState(breathingState.currentStage, {
    breathingSpeed,
    dispatchNextStage,
  });

  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          navigation.pop();
        }}
        title='Quit'
      />
      {runComponent}
      <Button onPress={() => dispatchNextStage()} title='Next' />
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
