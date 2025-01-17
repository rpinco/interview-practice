import { useEffect, useRef } from 'react';

export function useInterval(fn, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = fn;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}