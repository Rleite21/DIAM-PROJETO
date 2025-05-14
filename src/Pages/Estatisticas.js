import React from "react";
import '../cssFiles/Estatisticas.css';


function Estatisticas({user}){
   return( 
    <div>
        <hr />
        <h2 id="titulo_est">Estatísticas</h2>
        <div className="est_block_container">
            <div className="est_block">
                <h3><strong>Bebidas</strong></h3>
                <p>{user.total_drinks}</p>
            </div>
            <div className="est_block">
                <h3><strong>Festas</strong></h3>
                <p>{user.total_parties}</p>
            </div>
            <div className="est_block" id="classific">
                <h3><strong>Classificação</strong></h3>
                <p>{user.classific}</p>
            </div>
        </div>
    </div>
);

}


export default Estatisticas;