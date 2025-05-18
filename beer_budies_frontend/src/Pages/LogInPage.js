import { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../cssFiles/LogIn.css';
import Header from "../Header/Header";

function LogInPage(){
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('access');
        if (token) {
            setUsername('Utilizador autenticado');
        } else {
            setUsername(null);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setUsername(null);
        navigate('/LogIn');
    };

    return (
        <div>
            <Header />
            <div className="login-status-box">
                {username ? (
                    <>
                        <h2 className="welcome-message">Olá, {username}!</h2>
                        <button className="logout-button" onClick={handleLogout}>Terminar sessão</button>
                    </>
                ) : (
                    <>
                        <h2 className="welcome-message">Olá, não estás logado!</h2>
                        <div className="auth-buttons-container">
                            <button className="loginregister-button" onClick={() => navigate("/LogIn")}>Iniciar Sessão</button>
                            <button className="loginregister-button" onClick={() => navigate("/Register")}>Criar Conta</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default LogInPage;
