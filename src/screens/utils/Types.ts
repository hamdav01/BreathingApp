import { RoundType } from '../../components/Rounds';
import { BreathingSpeeds } from '../Selection';

export type RootStackParamList = {
  Selection: undefined;
  Run: { breathingSpeed: Values<typeof BreathingSpeeds>; rounds?: RoundType[] };
};

export type Values<T> = T[keyof T];
