import Link from 'next/link';

export default function Tetris() {
  return(
    <>
      <h1>
        Tetris
      </h1>
      <p>
        Build a Tetris Game (as far as you can take it)
      </p>
      
      <div>Solution <Link href="./sudoku-solution">here</Link></div>

      <iframe width="560" height="315" src="https://www.youtube.com/embed/M8fqHaJU_cc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </>
  )
}
