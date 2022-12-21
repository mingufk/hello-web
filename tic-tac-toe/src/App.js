import { useState } from 'react'
import './App.css'
import Board from './Board'
import calculateWinner from './calculateWinner'

function App(props) {
  const [state, setState] = useState({
    history: [{ squares: Array(9).fill(null) }],
    xIsNext: true,
  })

  const handleClick = (i) => {
    const history = state.history
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = state.xIsNext ? 'X' : 'O'
    setState({
      history: history.concat([
        {
          squares,
        },
      ]),
      xIsNext: !state.xIsNext,
    })
  }

  const history = state.history
  const current = history[history.length - 1]
  const winner = calculateWinner(current.squares)

  let status
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player : ' + (state.xIsNext ? 'X' : 'O')
  }

  return (
    <div className="App">
      <div className="App-board">
        <h1>Tic Tac Toe</h1>
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="App-info">
        <div>{status}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  )
}

export default App
