import React, { useEffect, useState, createContext }  from "react";
import Profile from "./Profile.js";
import Estatisticas from "./Estatisticas.js";
import Info from '../PerfilEstatisticas/User.json';
import ProximosEventos from "./Eventos.js";
import Header from "../Header/Header.js";
export const user = createContext(Info); /*Se calhar mais tarde por isto numa pagina mais geral*/


function PerfilEstatisticas({id}){
    const [user, setUser] = useState(null);
        const [loadingData, setLoadingData] = useState(true);
    
        useEffect(() => {
            const foundUser = Info.find(user => user.id == id);
            setUser(foundUser);
            setLoadingData(false);
        }, [id]);
    
    
        if(loadingData){
            return <h1 className="errorMessage">Carregando...</h1>
        }
        if(!user){
            return <h1 className="errorMessage">Ora Bolas...Utilizador não encontrado...</h1>
        }
    return(
        <>
            <Header />
            <ProximosEventos/>
            <Profile user={user}/>
            <Estatisticas user={user}/>
        </>
        
    );
}


export default PerfilEstatisticas