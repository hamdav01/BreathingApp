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
  data: { nextStage: RunStage };
}

export const initBreathState = {
  currentStage: RunStage.BREATHING,
};

export const setNextBreathingStage = (nextStage: RunStage): ReturnTypeNext => ({
  type: BreathingActions.NEXT,
  data: { nextStage },
});

export const breathReducer = (
  state: typeof initBreathState,
  action: Actions
) => {
  switch (action.type) {
    case BreathingActions.NEXT:
      console.log('next: ', action);

      console.log('next data: ', {
        ...state,
        currentStage: action.data.nextStage,
      });
      return { ...state, currentStage: action.data.nextStage };
    default:
      return state;
  }
};
