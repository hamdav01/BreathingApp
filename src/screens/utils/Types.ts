import { RoundType } from '../../components/Rounds';

export type RootStackParamList = {
  Selection: undefined;
  Run: { breathingSpeed: number; rounds: RoundType[] };
};

export type Values<T> = T[keyof T];
