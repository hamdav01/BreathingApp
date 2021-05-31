import { RoundType } from '../../components/Rounds';

enum BreathingActions {
  NEXT = 'NEXT',
  FINISH = 'FINISH',
}

export enum RunStage {
  BREATHING = 'Breathing',
  HOLDING_BREATH = 'HoldingBreath',
  RECOVERY_BREATH = 'RecoveryBreath',
}

type Actions = ReturnType<typeof setNextBreathingStage>;

interface ReturnTypeNext {
  type: BreathingActions.NEXT;
}
const initRounds = [
  {
    time: 130,
    id: '1',
  },
] as RoundType[];
export const initBreathState = {
  currentStage: RunStage.BREATHING,
  rounds: initRounds,
};

export const setNextBreathingStage = (): ReturnTypeNext => ({
  type: BreathingActions.NEXT,
});

const updateToNextStage = (nextStage: RunStage) => {
  switch (nextStage) {
    case RunStage.BREATHING:
      return RunStage.HOLDING_BREATH;
    case RunStage.HOLDING_BREATH:
      return RunStage.RECOVERY_BREATH;
    case RunStage.RECOVERY_BREATH:
      return RunStage.BREATHING;
  }
};

export const breathReducer = (
  state: typeof initBreathState,
  action: Actions
) => {
  switch (action.type) {
    case BreathingActions.NEXT:
      return {
        ...state,
        currentStage: updateToNextStage(state.currentStage),
      };
    default:
      return state;
  }
};
