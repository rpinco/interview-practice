import Link from 'next/link';

export default function Hooks() {
  return(
    <>
      <h1>
        Hooks
      </h1>
      <ol>
        <li>Build a useInterval hook. See Documentation <Link href="https://github.com/streamich/react-use/blob/master/docs/useInterval.md">here</Link></li>
        <li>Build a useDebounce hook. See Documentation <Link href="https://github.com/streamich/react-use/blob/master/docs/useDebounce.md">here</Link></li>
      </ol>

      <div>Solution <Link href="./custom-hooks">here</Link></div>
    </>
  )
}
