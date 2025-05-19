import React, { useEffect } from "react";
import '../cssFiles/Estatisticas.css';


function Estatisticas({total_bebidas,total_festas,classificacao}){

   useEffect(() => {
       fetch('http://localhost:8000/beer_budies/api/user/', {
           headers: {
               'Authorization': `Bearer ${localStorage.getItem('access')}`
           }
       });
   }, []);

   return( 
    <div>
        <hr />
        <h2 id="titulo_est">Estatísticas</h2>
        <div className="est_block_container">
            <div className="est_block">
                <h3><strong>Bebidas</strong></h3>
                <p>{total_bebidas}</p>
            </div>
            <div className="est_block">
                <h3><strong>Festas</strong></h3>
                <p>{total_festas}</p>
            </div>
            <div className="est_block" id="classific">
                <h3><strong>Classificação</strong></h3>
                <p>{classificacao}</p>
            </div>
        </div>
    </div>
);

}


export default Estatisticas;