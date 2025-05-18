import React, { useEffect, useState } from "react";
import Profile from "./Profile.js";
import Estatisticas from "./Estatisticas.js";
import Header from "../Header/Header.js";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function PerfilEstatisticas() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
    axios.get('http://localhost:8000/beer_budies/api/user/', { withCredentials: true })
        .then(response => setUser(response.data))
        .catch(() => {
            setUser(null);
            navigate('/logInPage'); // redirecionar para login em caso de erro
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
        </>
    );
}

export default PerfilEstatisticas;
