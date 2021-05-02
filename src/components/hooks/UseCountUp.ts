import { useEffect, useState } from 'react';

export default function useCountUp(
  countUpAmount: number,
  intervalTime: number,
  doneCallback: () => void
) {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const removeInterval = setInterval(() => {
      setCounter((count) => 1 + count);
    }, intervalTime);
    const removeTimeout = setTimeout(() => {
      clearInterval(removeInterval);
      doneCallback();
    }, countUpAmount * intervalTime);
    return () => {
      clearTimeout(removeTimeout);
      clearInterval(removeInterval);
    };
  }, []);
  return [counter];
}
