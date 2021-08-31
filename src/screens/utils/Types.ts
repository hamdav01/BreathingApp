import { RoundType } from '../../components/Rounds';
import { BreathingSpeeds } from '../Selection';

export type RootStackParamList = {
  Selection: undefined;
  Summary: {
    rounds: number[];
  };
  Run: {
    breathingSpeed: Values<typeof BreathingSpeeds>;
    rounds?: RoundType[];
    breaths: number;
  };
};

export type Values<T> = T[keyof T];
