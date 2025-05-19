import { useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import '../cssFiles/LogIn.css';
import Header from "../Header/Header";
import axios from 'axios';




function LogIn() {
    const [username,setUsername]= useState('');
    const [password,setPassword]= useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/beer_budies/api/token/', {
                username,
                password
            });
            //guarda o token JWT
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);

            //identifica e guarda o id do utilizador autenticado
            const idRes = await axios.get('http://localhost:8000/beer_budies/api/user/id/', {
                headers: { 'Authorization': `Bearer ${response.data.access}` }
            });
            localStorage.setItem('user_id', idRes.data.user_id);

            navigate('/');
        } catch (error) {
            alert('Login failed: ' + (error.response?.data?.detail || error.message));
        }
    }

    return (
        <div className="app-container">
            <Header />
            <div id="login_container">
                <div id="login_box">
                    <h1>Entrar</h1>
                    <p>Ainda não tens conta? <a href="/Register"><strong>Criar conta</strong></a></p>
                    <form id="logIn_form" onSubmit={submitHandler}>
                        <label id="user_label">Nome de <strong>Usuário</strong></label>
                        <input id="input_user" type="text" value={username} onChange={(e)=>setUsername(e.target.value)}></input>
                        <label id="pass_label">Palavra-Passe</label>
                        <input id="input_pass" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                        <input id="Save_Info" type="checkbox"></input><strong>Guardar Info </strong>
                        <button
                            id="LogIn_Button"
                            type="submit"
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

