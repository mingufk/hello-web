import './App.css'
import Board from './Board'

function App() {
  return (
    <div className="App">
      <div className="App-board">
        <h1>Tic Tac Toe</h1>
        <Board />
      </div>
      <div className="App-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  )
}

export default App
