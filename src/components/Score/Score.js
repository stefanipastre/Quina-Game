import React from "react";

import './styles.css';

function Score({player, points, captures, pieces, status}) {
  console.log(status);
  return (
    <div className="container">
      <img src="https://static.escolakids.uol.com.br/2019/07/paisagem-natural.jpg" className="img"/>
      <div className={player=='white' ? "infoTextWhite" : "infoTextBlack"}>
        <span>{points} Pontos</span>
      </div>
      <div className={player=='white' ? "infoTextWhite" : "infoTextBlack"}>
        <span>{captures} Capturas</span>
      </div>
      <div className={player=='white' ? "infoTextWhite" : "infoTextBlack"}>
        <span>{pieces} Peças colocadas</span>
      </div>
      {status=='White'&&player=="white" ? <div className="infoSuaVez"><span>SUA VEZ</span></div> : null}
      {status=='Black'&&player=="black" ? <div className="infoSuaVez"><span>SUA VEZ</span></div> : null}
    </div>
  );
}

export default Score;
