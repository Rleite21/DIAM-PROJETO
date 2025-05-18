import { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../cssFiles/LogIn.css';
import Header from "../Header/Header";

function LogInPage(){
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/beer_budies/api/user/', { withCredentials: true })
            .then(response => {
                setUsername(response.data.username);
            })
            .catch(() => {
                setUsername(null);
            });
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:8000/beer_budies/api/logout/', { withCredentials: true });
            setUsername(null);
            navigate('/LogIn');
        } catch (error) {
            alert('Logout failed');
        }
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
