import { useEffect, useRef } from 'react';

export function useDebounce(fn, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = fn;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    return ()=> setTimeout(tick, delay);
  }, [delay]);
}