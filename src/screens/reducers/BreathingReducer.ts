import { head, tail } from 'ramda';
import shortid from 'shortid';
import { RoundType } from '../../components/Rounds';
import { BreathingSpeeds } from '../../screens/Selection';
import { Values } from '../utils/Types';
enum BreathingActions {
  NEXT = 'NEXT',
  FINISH = 'FINISH',
  SAVE_VALUE = 'SAVE_VALUE',
}

export enum RunStage {
  BREATHING = 'Breathing',
  HOLDING_BREATH = 'HoldingBreath',
  RECOVERY_BREATH = 'RecoveryBreath',
  NOT_STARTED = 'NotStarted',
}

type Actions = ReturnTypeSetNextBreathingStage | ReturnTypeSetSaveValue;

interface ReturnTypeSetNextBreathingStage {
  type: BreathingActions.NEXT;
}

export const setNextBreathingStage = (): ReturnTypeSetNextBreathingStage => ({
  type: BreathingActions.NEXT,
});

interface ReturnTypeSetSaveValue {
  payload: {
    saveValue: number;
  };
  type: BreathingActions.SAVE_VALUE;
}

export const setSaveValue = (saveValue: number): ReturnTypeSetSaveValue => ({
  payload: {
    saveValue,
  },
  type: BreathingActions.SAVE_VALUE,
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

export const getSavedRounds = ({ savedRounds }: BreathingReducerConfig) =>
  savedRounds;

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
  savedRounds: number[];
  breathingSpeed: Values<typeof BreathingSpeeds>;
}

export const breathReducer = (
  state: BreathingReducerConfig,
  action: Actions
) => {
  switch (action.type) {
    case BreathingActions.SAVE_VALUE:
      console.log('SAVE VALUE: ', [
        ...state.savedRounds,
        action.payload.saveValue,
      ]);
      return {
        ...state,
        savedRounds: [...state.savedRounds, action.payload.saveValue],
      };
    case BreathingActions.NEXT:
      return {
        ...state,
        ...updateToNextStage(state),
      };
    default:
      return state;
  }
};
