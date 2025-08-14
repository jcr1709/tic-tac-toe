import { useState } from "react";
import './styles.css'

function Squares({value, onSquareclick, disabled}){
  return(
    <button className="square" onClick={onSquareclick} disabled={disabled}>{value}</button>
  )
}

  function winner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for(let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

function Board() {

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xNext, setXNext]=useState(true);
  const [winnerState, setWinnerState]=useState(null);

  const handleClick = (i) => {
    if(squares[i] !== null || winnerState){
      return;
    }
    const nextSquares=[...squares]
    nextSquares[i] = xNext ? 'X' : 'O';
    setSquares(nextSquares);
    const w=winner(nextSquares);
    if(w){
      setWinnerState(w);
      return;
    }
    setXNext(!xNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXNext(true);
    setWinnerState(null);
  };

  return (
    <div>
      <h2>{winnerState?`winner: ${winnerState}`:`NextPlayer: ${xNext?'X':'O'}`}</h2>
      <div className="board">
        {squares.map((value, index) => (
          <Squares 
          key={index} 
          value={value} 
          onSquareclick={() => handleClick(index)} 
          disabled={winnerState !== null}
        />
  ))}
      </div>
      <button onClick={handleReset}>Reset Board</button>
    </div>
  );
}

export default Board;
