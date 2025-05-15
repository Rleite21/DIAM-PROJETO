import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import '../cssFiles/LogIn.css';
import Header from "../Header/Header";


function LogIn() {
    const navigate = useNavigate(); 
<<<<<<< Updated upstream
    const location = useLocation();
    const fromGrupos = location.state?.fromGrupos === true; 
    const grupoNome = location.state?.grupoNome || null;
=======
    const location = useLocation();   
    const from = location.state?.from?.pathname || '/';
>>>>>>> Stashed changes

    return (
        <div className="app-container">
            <Header />
            <div id="login_container">
                <div id="login_box">
                    <h1>Entrar</h1>
                    <p>Ainda não tens conta? <a><strong>Criar conta</strong></a></p>
                    <form id="logIn_form">
                        <label id="user_label">Nome de <strong>Usuário</strong> ou <strong>Email</strong></label>
                        <input id="input_user" type="text"></input>
                        <label id="pass_label">Palavra-Passe</label>
                        <input id="input_pass" type="text"></input>
                        <input id="Save_Info" type="checkbox"></input><strong>Guardar Info </strong>
                        <button
                            id="LogIn_Button"
<<<<<<< Updated upstream
                            type="button"
                            onClick={() => {
                                if (fromGrupos && grupoNome) {
                                    navigate(`/Grupo/${grupoNome}`);
                                } else {
                                    navigate('/');
                                }
                            }}
=======
                            type="button" 
                            onClick={() => navigate(from)}
>>>>>>> Stashed changes
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LogIn;