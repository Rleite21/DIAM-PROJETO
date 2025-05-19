import React, { useEffect, useState } from "react";
import Profile from "./Profile.js";
import Estatisticas from "./Estatisticas.js";
import Header from "../Header/Header.js";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Historico from "./Historico.js";
import Footer from "../Pages/Footer.js";

function PerfilEstatisticas() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/beer_budies/api/user/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
        })
        .then(response => setUser(response.data))
        .catch(() => {
            setUser(null);
            navigate('/logInPage');
        });
    }, [navigate]);

    if (!user) return <div>A carregar...</div>;

    return (
        <>
            <Header />
            <Profile username={user.username} date_entrada={user.data_entrada} />
            <Estatisticas 
                total_bebidas={user.total_bebidas}
                total_festas={user.total_festas}
                classificacao={user.classificacao}
            />
            <Historico/>
            <Footer/>
        </>
    );
}

export default PerfilEstatisticas;
