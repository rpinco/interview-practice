import { useId, useState } from 'react';
import { useInterval } from './useInterval';
import { useDebounce } from './useDebounce';
import Link from 'next/link';

function CustomHook() {
  const id = useId();
  const [input, setInput] = useState(0);
  const [debounced, setDebounced] = useState('')

  useInterval(() => setInput(input +1), 3000);  

  useDebounce(()=> setDebounced('10 seconds have passed!'), 10000)

  return (
    <>
    <div>

      <div>Using the useInterval, this will increment every 3 seconds: {input}</div>
      <div>Using the useDebouce, this will only show after 10 seconds: {debounced}</div>
    </div>

    <div style={{marginTop: '20px'}}>
      <button><Link href="../challenges/hooks">go back</Link></button>
    </div>
    </>
  );
}


export default CustomHook;