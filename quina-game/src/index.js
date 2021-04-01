import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props){
      return (
        <button className="square" 
        onClick = {props.onClick}>
          {props.value}
        </button>
      );
}
  
class Board extends React.Component {

    renderSquare(i) {
      return (
      <Square 
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)} />
      );
    }
  
    render() {
    
    const boardSize = 19;

    const squares = [];

    for(let r = 0; r < boardSize; ++r) {
        let row = [];

        for(let c = 0; c < boardSize; ++c) {
          row.push(this.renderSquare(r * boardSize + c));
        }

      squares.push(<div key={r} className="board-row">{row}</div>);

    }
    console.log(squares[0]);
    // for(let a = 0; a < boardSize; ++a) {
    //   console.log(this.props.squares);
    // }

      return (
        <div>{squares}</div>
      );
    }

}
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history : [{
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
      };
    }

    handleClick(i){
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares, this.state.stepNumber) || squares[i]){
          return;
      }
      squares[i] = this.state.xIsNext  ? 'P' : 'B';
      this.setState({
          history: history.concat([{
            squares: squares,
          }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
      });
    }

    jumpTo(step){
      this.setState({
        stepNumber: step,
        xIsNext: (step%2) === 0,
      });
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares, this.state.stepNumber);

      const moves = history.map((step, move) => {
        const desc = move ?
        'Go to move #' + move :
        'Go to game start';
        return(
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });

      let status;
      
      if(winner) {
        status = 'Winner: ' + winner;
      }else{
        status = 'Next player: '+ (this.state.xIsNext  ? 'P' : 'B');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)} 
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares, stepNumber) {
    
    if(stepNumber === 0){
      return null;
    }else{
      const boardSize = 19;
      let cols = 0;
      let rows = 0;

      //horizontal
      //for P
      for(let r = 0; r < boardSize; ++r) {
        cols = cols + 19;
        for(let c = 0; c < cols-4; ++c) {
            if(squares[c] === 'P' && squares[c+1] === 'P' && squares[c+2] === 'P' && squares[c+3] === 'P' && squares[c+4] === 'P'){
              return squares[c];
            }
        }
      }
      //for B
      for(let r = 0; r < boardSize; ++r) {
        cols = cols + 19;
        for(let c = 0; c < cols-4; ++c) {
            if(squares[c] === 'B' && squares[c+1] === 'B' && squares[c+2] === 'B' && squares[c+3] === 'B' && squares[c+4] === 'B'){
              return squares[c];
            }
        }
      }

      //vertical
      //for P
      for(let c = 0; c < boardSize; ++c) {
        rows = c + (18*19);
        for(let r = c; r < rows-76; r=r+19) {
            if(squares[r] === 'P' && squares[r+19] === 'P' && squares[r+38] === 'P' && squares[r+57] === 'P' && squares[r+76] === 'P'){
              return squares[r];
            }
        }
      }
      //for B
      for(let c = 0; c < boardSize; ++c) {
        rows = c + (18*19);
        for(let r = c; r < rows-76; r=r+19) {
            if(squares[r] === 'B' && squares[r+19] === 'B' && squares[r+38] === 'B' && squares[r+57] === 'B' && squares[r+76] === 'B'){
              return squares[r];
            }
        }
      }


      return null;
    }

  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  