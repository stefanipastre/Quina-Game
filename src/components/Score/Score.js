import React, {useEffect, useState} from "react";
import Aluno from "../../assets/avatarAluno.png";
import Trabalho from "../../assets/avatarTrabalhos.png";
/* eslint-disable */
import './styles.css';

function Score({player, points, captures, status}) {

  const[piecesBlack,setPiecesBlack] = useState(0);
  const[piecesWhite,setPiecesWhite] = useState(0);

  function setScore(){
    status==='White'&&player==="white" ? setPiecesWhite(piecesWhite+1) : null;
    status==='Black'&&player==="black" ? setPiecesBlack(piecesBlack+1) : null;
  }

  useEffect(() => {setScore()}, [status])

  return (
    <div className="container">
      <img src={player==='white' ? Aluno : Trabalho }/>
      <div className={player==='white' ? "infoTextWhite" : "infoTextBlack"}>
        <span>{player==='white' ? piecesWhite : piecesBlack} Peças colocadas</span>
      </div>
      {status==='White'&&player==="white" ? <div className="infoSuaVez"><span>SUA VEZ</span></div> : null}
      {status==='Black'&&player==="black" ? <div className="infoSuaVez"><span>SUA VEZ</span></div> : null}
    </div>
  );
}

export default Score;
