import React, { useEffect, useState, useContext } from "react";
import Profile from "./Profile.js";
import Estatisticas from "./Estatisticas.js";
import Header from "../Header/Header.js";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';

function PerfilEstatisticas() {
    const [user, setUser] = useState(null);
    const { userId } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate('/LogIn');
            return;
        }

        axios.get(`http://localhost:8000/beer_budies/api/userinfo/${userId}/`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error(error);
                navigate('/LogIn');
            });
    }, [userId, navigate]);

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
