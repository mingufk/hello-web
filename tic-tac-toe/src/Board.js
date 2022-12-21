import Square from './Square'

function Board() {
  const square = (i) => {
    return <Square value={i} />
  }
  const status = 'Next player: X'

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {square(0)}
        {square(1)}
        {square(2)}
      </div>
      <div className="board-row">
        {square(3)}
        {square(4)}
        {square(5)}
      </div>
      <div className="board-row">
        {square(6)}
        {square(7)}
        {square(8)}
      </div>
    </div>
  )
}

export default Board
