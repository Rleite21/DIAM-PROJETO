import React from "react";
import '../cssFiles/Profile.css';

function Profile({user}) {



    return (
        <div>
            <div id="titulo">
                <h1><strong>Perfil</strong></h1>
                <button id="definitions">
                <img src="https://cdn-icons-png.flaticon.com/512/503/503849.png " alt="Decorative" />
                    </button>
            </div>
            
            <hr />
            <figure id="profile_fig">
                <img id="profilePic" src="https://cdn-icons-png.flaticon.com/512/456/456212.png" alt="Profile" />
                <figcaption>
                    <h2>Olá, {user.name}</h2>
                    <p><span className="info_pro">Utilizador:</span> {user.username}</p>
                    <p><span className="info_pro">Data Entrada:</span> {user.date_entry}</p>
                </figcaption>
            </figure>
        </div>
    );
}

export default Profile;