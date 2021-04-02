import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BlackBall from './components/Balls/BlackBall/BlackBall';
import WhiteBall from './components/Balls/WhiteBall/WhiteBall';
import Score from './components/Score/Score'
import Title from './components/Title/Title'


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
      squares[i] = this.state.xIsNext  ? <BlackBall /> : <WhiteBall />;
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
        status = (this.state.xIsNext  ? 'Black' : 'White');
      }

      return (
        <>
        <Title title="ESTUDANTE VS TRABALHOS"/>
        <div className="game">
          <Score player="white" points="04" captures="05" pieces="06" status={status}/>
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)} 
            />
          </div>
            <Score player="black" points="01" captures="02" pieces="03" status={status}/>
        </div>
        </>
      );
    }
  }

  function calculateWinner(squares, stepNumber) {
    
    if(stepNumber === 0){
      //if it's the first play, it returns null to continue
      return null;
    }else{
      const boardSize = 19;
      let cols = 0;
      let rows = 0;

      //horizontal
      //for P
      for(let r = 0; r < boardSize; ++r) {
        cols = cols + boardSize;
        for(let c = 0; c < cols-4; ++c) {
            if(squares[c] === <BlackBall /> && squares[c+1] === <BlackBall /> && squares[c+2] === <BlackBall /> && squares[c+3] === <BlackBall /> && squares[c+4] === <BlackBall />){
              return squares[c];
            }
        }
      }
      //for B
      for(let r = 0; r < boardSize; ++r) {
        cols = cols + boardSize;
        for(let c = 0; c < cols-4; ++c) {
            if(squares[c] === <WhiteBall /> && squares[c+1] === <WhiteBall /> && squares[c+2] === <WhiteBall /> && squares[c+3] === <WhiteBall /> && squares[c+4] === <WhiteBall />){
              return squares[c];
            }
        }
      }

      //vertical
      //for P
      for(let c = 0; c < boardSize; ++c) {
        rows = c + ((boardSize-1)*boardSize);
        for(let r = c; r < rows-(boardSize*4); r=r+boardSize) {
            if(squares[r] === <BlackBall /> && squares[r+boardSize] === <BlackBall /> && squares[r+(boardSize*2)] === <BlackBall /> && squares[r+(boardSize*3)] === <BlackBall /> && squares[r+(boardSize*4)] === <BlackBall />){
              return squares[r];
            }
        }
      }
      //for B
      for(let c = 0; c < boardSize; ++c) {
        rows = c + ((boardSize-1)*boardSize);
        for(let r = c; r < rows-(boardSize*4); r=r+boardSize) {
            if(squares[r] === <WhiteBall /> && squares[r+boardSize] === <WhiteBall /> && squares[r+(boardSize*2)] === <WhiteBall /> && squares[r+(boardSize*3)] === <WhiteBall /> && squares[r+(boardSize*4)] === <WhiteBall />){
              return squares[r];
            }
        }
      }

      //positive diagonal
      //for P
      for(let c = 0; c < boardSize-4; ++c) {
        rows = c + ((boardSize-1)*boardSize);
        for(let r = c; r < rows-(boardSize*4); r=r+19) {
            if(squares[r] === <BlackBall /> && squares[r+(boardSize+1)] === <BlackBall /> && squares[r+(boardSize*2)+2] === <BlackBall /> && squares[r+(boardSize*3)+3] === <BlackBall /> && squares[r+(boardSize*4)+4] === <BlackBall />){
              return squares[r];
            }
        }
      }
      //for B
      for(let c = 0; c < boardSize-4; ++c) {
        rows = c + ((boardSize-1)*boardSize);
        for(let r = c; r < rows-(boardSize*4); r=r+boardSize) {
            if(squares[r] === <WhiteBall /> && squares[r+(boardSize+1)] === <WhiteBall /> && squares[r+(boardSize*2)+2] === <WhiteBall /> && squares[r+(boardSize*3)+3] === <WhiteBall /> && squares[r+(boardSize*4)+4] === <WhiteBall />){
              return squares[r];
            }
        }
      }

      console.log(<BlackBall />)
      //negative diagonal
      //for P
      for(let c = 4; c < boardSize; ++c) {
        rows = c + ((boardSize-1)*boardSize);
        for(let r = c+(boardSize*3); r < rows; r=r+boardSize) {
            if(squares[r] === <BlackBall /> && squares[r+(boardSize-1)] === <BlackBall /> && squares[r+(boardSize*2)-2] === <BlackBall /> && squares[r+(boardSize*3)-3] === <BlackBall /> && squares[r+(boardSize*4)-4] === <BlackBall />){
              return squares[r];
            }
        }
      }
      //for B
      for(let c = 4; c < boardSize; ++c) {
        rows = c + ((boardSize-1)*boardSize);
        for(let r = c+(boardSize*3); r < rows; r=r+boardSize) {
            if(squares[r] === <WhiteBall /> && squares[r+(boardSize-1)] === <WhiteBall /> && squares[r+(boardSize*2)-2] === <WhiteBall /> && squares[r+(boardSize*3)-3] === <WhiteBall /> && squares[r+(boardSize*4)-4] === <WhiteBall />){
              return squares[r];
            }
        }
      }

      //continue game
      return null;
    }

  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  