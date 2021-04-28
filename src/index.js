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
          squares: Array(361).fill(""),
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
      
      squares[i] = this.state.xIsNext  ?  <BlackBall /> : <WhiteBall />;
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

      let status;
      let piecesBlack = 0;
      let piecesWhite = 0;
      
      
      if(winner) {
        status = 'Winner: ' + winner;
      }else{
        status = (this.state.xIsNext  ? 'Black' : 'White');
      }

      return (
        <>
        <Title title="ESTUDANTE VS TRABALHOS"/>
        <div className="game">
          <Score player="white" points="0" captures="05" pieces={piecesWhite, piecesBlack} status={status}/>
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)} 
            />
          </div>
            <Score player="black" points="01" captures="02" pieces={piecesBlack, piecesWhite} status={status}/>
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
      for(let r = 0; r < boardSize; ++r) {
        cols = cols + boardSize;
        for(let c = 0; c < cols-4; ++c) {
            if(Object.is(squares[c].type,BlackBall) && Object.is(squares[c+1].type,BlackBall)  && Object.is(squares[c+2].type,BlackBall)  && Object.is(squares[c+3].type,BlackBall)  && Object.is(squares[c+4].type,BlackBall) ){
              console.log("ganhou Preto");
              return squares[c];
            }
            //branco
            if(Object.is(squares[c].type,WhiteBall) && Object.is(squares[c+1].type,WhiteBall)  && Object.is(squares[c+2].type,WhiteBall)  && Object.is(squares[c+3].type,WhiteBall)  && Object.is(squares[c+4].type,WhiteBall) ){
              console.log("ganhou Branco");
              return squares[c];
            }
        }
      }

      //vertical
      for(let c = 0; c < boardSize; ++c) {
        rows = c + ((boardSize-1)*boardSize);
        for(let r = c; r < rows-(boardSize*4); r=r+boardSize) {
            if(Object.is(squares[r].type,BlackBall) && Object.is(squares[r+boardSize].type,BlackBall) && Object.is(squares[r+(boardSize*2)].type,BlackBall) && Object.is(squares[r+(boardSize*3)].type,BlackBall) && Object.is(squares[r+(boardSize*4)].type,BlackBall)){
              console.log("ganhou Preto");
              return squares[r];
            }
            //verifica branco
            if(Object.is(squares[r].type,WhiteBall) && Object.is(squares[r+boardSize].type,WhiteBall) && Object.is(squares[r+(boardSize*2)].type,WhiteBall) && Object.is(squares[r+(boardSize*3)].type,WhiteBall) && Object.is(squares[r+(boardSize*4)].type,WhiteBall)){
              console.log("ganhou Branco");
              return squares[r];
            }
        }
      }
      

      //positive diagonal
      //for P
      for(let c = 0; c < boardSize-4; ++c) {
        rows = c + ((boardSize-1)*boardSize);
        for(let r = c; r < rows-(boardSize*4); r=r+19) {
            if(Object.is(squares[r].type,BlackBall) && Object.is(squares[r+(boardSize+1)].type,BlackBall) && Object.is(squares[r+(boardSize*2)+2].type,BlackBall) && Object.is(squares[r+(boardSize*3)+3].type,BlackBall) && Object.is(squares[r+(boardSize*4)+4].type,BlackBall)){
              console.log("ganhou Preto");
              return squares[r];
            }
            //verifica branco
            if(Object.is(squares[r].type,WhiteBall) && Object.is(squares[r+(boardSize+1)].type,WhiteBall) && Object.is(squares[r+(boardSize*2)+2].type,WhiteBall) && Object.is(squares[r+(boardSize*3)+3].type,WhiteBall) && Object.is(squares[r+(boardSize*4)+4].type,WhiteBall)){
              console.log("ganhou Branco");
              return squares[r];
            }
        }
      }

       
      //negative diagonal
      //for P
      for(let c = 4; c < boardSize; ++c) {
        rows = c + ((boardSize-1)*boardSize);
        for(let r = c+(boardSize*3); r < rows; r=r+boardSize) {
            if(Object.is(squares[r].type,BlackBall) && Object.is(squares[r+(boardSize-1)].type,BlackBall) && Object.is(squares[r+(boardSize*2)-2].type,BlackBall) && Object.is(squares[r+(boardSize*3)-3].type,BlackBall) && Object.is(squares[r+(boardSize*4)-4].type,BlackBall)){
              console.log("ganhou Preto");
              return squares[r];
            }
            //verifica branco
            if(Object.is(squares[r].type,WhiteBall) && Object.is(squares[r+(boardSize-1)].type,WhiteBall) && Object.is(squares[r+(boardSize*2)-2].type,WhiteBall) && Object.is(squares[r+(boardSize*3)-3].type,WhiteBall) && Object.is(squares[r+(boardSize*4)-4].type,WhiteBall)){
              console.log("ganhou Branco");
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
  