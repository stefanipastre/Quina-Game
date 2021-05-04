import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Title from './components/Title/Title'
import ButtonGame from './components/Button/Button'
  
  class Game extends React.Component {
    
    render() {
      
      return (
        <>
        <Title title="ESTUDANTE VENCERAM !"/>
        <div className = "container">
          
          <ButtonGame/>
          
          </div>  
        </>
      );
    }
  }

 
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  