import React, { useEffect, useState, useCallback } from "react";
import Profile from "./Profile.js";
import Estatisticas from "./Estatisticas.js";
import Header from "../Header/Header.js";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Historico from "./Historico.js";
import Footer from "../Pages/Footer.js";

function PerfilEstatisticas() {
    const [user, setUser] = useState(null);
    const [refreshHeader, setRefreshHeader] = useState(0); 
    const navigate = useNavigate();

    // Função para atualizar o user (e estatísticas)
    const refreshUser = useCallback(() => {
        axios.get('http://localhost:8000/beer_budies/api/user/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
        })
        .then(response => {
            setUser(response.data);
            setRefreshHeader(v => v + 1); 
        })
        .catch(() => {
            setUser(null);
            navigate('/logInPage');
        });
    }, [navigate]);

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    if (!user) return <div>A carregar...</div>;

    return (
        <>
            <Header refreshTrigger={refreshHeader} />
            <Profile username={user.username} date_entrada={user.data_entrada} />
            <Estatisticas 
                total_bebidas={user.total_bebidas}
                total_festas={user.total_festas}
                classificacao={user.classificacao}
            />
            <Historico onAtualizarContador={refreshUser} />
            <Footer/>
        </>
    );
}

export default PerfilEstatisticas;
