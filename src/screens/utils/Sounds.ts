import { useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { AVPlaybackSource } from 'expo-av/build/AV';
import { clamp } from 'ramda';
import { useCallback, useEffect, useState } from 'react';
interface UseSound {
  soundToPlay: AVPlaybackSource;
  playInitial?: boolean;
  volume?: number;
  loop?: boolean;
  playback?: number;
}

export const useSound = ({
  soundToPlay,
  playInitial = false,
  volume = 1.0,
  loop = false,
  playback = 1.0,
}: UseSound) => {
  const [sound, setSound] = useState<Audio.Sound>();

  const playSound = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();

      if (status.isLoaded && !status.isPlaying) {
        await sound.playAsync();
      }
    }
  };

  const unloadSound = (time = 1000) => {
    if (sound) {
      rampVolume(sound, 0, time).then(() => sound.unloadAsync());
    }
  };

  useFocusEffect(useCallback(() => unloadSound, [sound]));

  useEffect(() => {
    const initSound = async () => {
      const { sound } = await Audio.Sound.createAsync(soundToPlay, {
        volume,
        rate: playback,
        isLooping: loop,
        shouldPlay: playInitial,
      });
      setSound(sound);
    };
    initSound();
  }, []);
  return { playSound, stopSound: unloadSound };
};

const rampVolume = async (
  sound: Audio.Sound,
  targetVolume: number,
  targetTime: number
) => {
  const status = await sound.getStatusAsync();
  let currentTime = targetTime;
  let previousTimeStamp = 0;
  if (status.isLoaded && status.volume > 0) {
    const { volume } = status;
    const amountToRemove = volume - targetVolume;
    return new Promise(() => {
      const updateVolume = async (timeStamp: number) => {
        const time =
          previousTimeStamp !== 0 ? timeStamp - previousTimeStamp : 0;
        currentTime = clamp(0, Infinity, currentTime - time);
        const percentageLeft = currentTime / targetTime;
        await sound.setVolumeAsync(
          volume - (status.volume - percentageLeft * amountToRemove)
        );
        previousTimeStamp = timeStamp;
        if (currentTime <= 0) {
          return Promise.resolve();
        } else {
          requestAnimationFrame(updateVolume);
        }
      };
      requestAnimationFrame(updateVolume);
    });
  }

  return Promise.resolve();
};
