import { head, tail } from 'ramda';
import shortid from 'shortid';
import { RoundType } from '../../components/Rounds';
import { BreathingSpeeds } from '../../screens/Selection';
import { Values } from '../utils/Types';
enum BreathingActions {
  NEXT = 'NEXT',
  FINISH = 'FINISH',
}

export enum RunStage {
  BREATHING = 'Breathing',
  HOLDING_BREATH = 'HoldingBreath',
  RECOVERY_BREATH = 'RecoveryBreath',
  NOT_STARTED = 'NotStarted',
}

type Actions = ReturnType<typeof setNextBreathingStage>;

interface ReturnTypeNext {
  type: BreathingActions.NEXT;
}

export const setNextBreathingStage = (): ReturnTypeNext => ({
  type: BreathingActions.NEXT,
});

export const getUpcomingRound = (rounds?: RoundType[]) => {
  if (rounds === undefined) {
    return {
      rounds: undefined,
      currentRound: { time: Infinity, id: shortid.generate() },
    };
  }
  return {
    rounds: tail(rounds),
    currentRound: head(rounds),
  };
};

const updateToNextStage = ({
  currentStage,
  rounds,
}: BreathingReducerConfig) => {
  switch (currentStage) {
    case RunStage.HOLDING_BREATH:
      return { currentStage: RunStage.RECOVERY_BREATH };
    case RunStage.RECOVERY_BREATH:
      return { currentStage: RunStage.BREATHING, ...getUpcomingRound(rounds) };
    case RunStage.BREATHING:
      return {
        currentStage: RunStage.HOLDING_BREATH,
      };
  }
};

interface BreathingReducerConfig {
  currentStage: RunStage;
  rounds?: RoundType[];
  currentRound?: RoundType;
  breathingSpeed: Values<typeof BreathingSpeeds>;
}

export const breathReducer = (
  state: BreathingReducerConfig,
  action: Actions
) => {
  switch (action.type) {
    case BreathingActions.NEXT:
      return {
        ...state,
        ...updateToNextStage(state),
      };
    default:
      return state;
  }
};
