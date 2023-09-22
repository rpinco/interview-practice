import { useState } from 'react';
import styles from './sudoku.module.css'
import Link from 'next/link';

export default function SudokuSolution () {
  const initialGrid = Array.from({ length: 9 }, () => Array(9).fill(0));
  const [sudokuGrid, setSudokuGrid] = useState(initialGrid);
  const [errorMessage, setErrorMessage] = useState('');

  const hasDuplicates = (arr)=> {
    const seen = new Set();
    for (const num of arr) {
      if (num !== 0) {
        if (seen.has(num)) {
          return true;
        }
        seen.add(num);
      }
    }
    return false;
  }

  function isValidSudoku(board) {
    
    //check rows first, the easy part: 
    sudokuGrid.forEach(row=> {
      if (hasDuplicates(row)){
        return false;
      }
    })

    //check columns now, parse each column as an array, then check each column
    for (let col = 0; col < 9; col++) {
      const column = [];
      for (let row = 0; row < 9; row++) {
        column.push(board[row][col]);
      }
      if (hasDuplicates(column)) {
        return false;
      }
    }

    //check subgrids now, using the same approach, 9 arrays with each subgrid
    // Check 3x3 subgrids (boxes)
    for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const box = [];
      for (let row = boxRow * 3; row < (boxRow + 1) * 3; row++) {
        for (let col = boxCol * 3; col < (boxCol + 1) * 3; col++) {
          box.push(board[row][col]);
        }
      }
      if (hasDuplicates(box)) {
        return false;
      }
    }
  }
    

    return true; // 
  }

  // Render the Sudoku grid
  return (
    <>
    <div className={styles.sudoku}>
      {sudokuGrid.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.sudokuRow}>
          {row.map((cell, columnIndex) => (
            <input
              key={columnIndex}
              className={styles.sudokuCell}
              type="number"
              min="1"
              max="9"
              value={cell === 0 ? '' : cell}
              onChange={(e) => {
                const newValue = parseInt(e.target.value, 10) || 0;
                const newGrid = [...sudokuGrid];
                newGrid[rowIndex][columnIndex] = newValue > 9? 0: newValue;
                if (isValidSudoku(newGrid)) {
                  setErrorMessage('')
                  setSudokuGrid(newGrid);
                } else {
                  newGrid[rowIndex][columnIndex] = '';
                  setSudokuGrid(newGrid);
                  setErrorMessage('cant place that number there')
                }
              }}
            />
          ))}
        </div>
      ))}
      <div className={styles.errorMessage}>{errorMessage}</div>
      <button className={styles.validate} onClick={() => isValidSudoku(sudokuGrid)?setErrorMessage('invalid sudoku'): setErrorMessage('valid sudoku')}>
        Check Validity
      </button>
    </div>

    <div className={styles.goBack}>
      <button  className={styles.goBack}><Link href="../challenges/sudoku">go back</Link></button>
    </div>
    </>
  );
}