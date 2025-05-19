import React from "react";
import '../cssFiles/Profile.css';
import { useNavigate } from "react-router-dom";

function Profile({username, date_entrada}) {
    const navigate = useNavigate();

    return (
        <div>
            <div id="titulo">
                <h1><strong>Perfil</strong></h1>
                <button id="settings" onClick={() => navigate('/settings')}>
                    <img src="https://cdn-icons-png.flaticon.com/512/503/503849.png" alt="Decorative" />
                </button>
            </div>
            
            <hr />
            <figure id="profile_fig">
                <img id="profilePic" src="https://cdn-icons-png.flaticon.com/512/456/456212.png" alt="Profile" />
                <figcaption>
                    <p><span className="info_pro">Utilizador:</span> {username}</p>
                    <p><span className="info_pro">Data Entrada:</span> {date_entrada}</p>
                </figcaption>
            </figure>
        </div>
    );
}

export default Profile;