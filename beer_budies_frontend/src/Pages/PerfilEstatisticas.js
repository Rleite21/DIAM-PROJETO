import React, { useEffect, useState, } from "react";
import Profile from "./Profile.js";
import Estatisticas from "./Estatisticas.js";
import Header from "../Header/Header.js";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function PerfilEstatisticas() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    return (
        <>
            <Header />
            {user && (
                <>
                    <Profile user={user}/>
                    <Estatisticas user={user}/>
                </>
            )}
        </>
    );
}

export default PerfilEstatisticas;
