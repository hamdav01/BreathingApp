import { useEffect, useState } from 'react';

export default function useCountUp(
  countUpAmount: number,
  intervalTime: number,
  doneCallback: () => void
) {
  const [counter, setCounter] = useState(1);
  const getCounter = () => counter;
  useEffect(() => {
    const removeInterval = setInterval(() => {
      setCounter((count) => 1 + count);
      if (countUpAmount < getCounter()) {
        clearInterval(removeInterval);
        doneCallback();
      }
    }, intervalTime);
    return () => {
      clearInterval(removeInterval);
    };
  }, [counter]);
  return [counter];
}
