import { useState } from 'react'
import './App.css'
import Board from './Board'
import calculateWinner from './calculateWinner'

function App() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }])
  const [stepNumber, setStepNumber] = useState(0)
  const [xIsNext, setXIsNext] = useState(true)

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1)
    const newCurrent = newHistory[newHistory.length - 1]
    const newSquares = newCurrent.squares.slice()
    if (calculateWinner(newSquares) || newSquares[i]) {
      return
    }
    newSquares[i] = xIsNext ? 'X' : 'O'
    setHistory([...newHistory, { squares: newSquares }])
    setStepNumber(newHistory.length)
    setXIsNext((prev) => !prev)
  }

  const jumpTo = (step) => {
    setStepNumber(step)
    setXIsNext(step % 2 === 0)
  }

  const current = history[stepNumber]
  const winner = calculateWinner(current.squares)

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start'
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  let status
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player : ' + (xIsNext ? 'X' : 'O')
  }

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="App-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="App-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

export default App
