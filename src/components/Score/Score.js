import React from "react";
import Aluno from "../../assets/avatarAluno.png";
import Trabalho from "../../assets/avatarTrabalhos.png";

import './styles.css';

function Score({player, points, captures, piecesWhite,piecesBlack, status}) {
  // console.log(status);
  return (
    <div className="container">
      <img src={player==='white' ? Aluno : Trabalho }/>
      {/* <div className={player==='white' ? "infoTextWhite" : "infoTextBlack"}>
        <span>{points} Pontos</span>
      </div> */}
      {/* <div className={player==='white' ? "infoTextWhite" : "infoTextBlack"}>
        <span>{captures} Capturas</span>
      </div> */}
      <div className={player==='white' ? "infoTextWhite" : "infoTextBlack"}>
        <span>{player==='white' ? piecesWhite : piecesBlack} Peças colocadas</span>
      </div>
      {status==='White'&&player==="white" ? <div className="infoSuaVez"><span>SUA VEZ</span></div> : null}
      {status==='Black'&&player==="black" ? <div className="infoSuaVez"><span>SUA VEZ</span></div> : null}
    </div>
  );
}

export default Score;
