import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import '../cssFiles/LogIn.css';
import Header from "../Header/Header";
import axios from 'axios';

function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const submitHandler = async(e) =>{
        e.preventDefault();
        try{
            await axios.post('http://127.0.0.1:8000/beer_budies/api/signup/', { username, password, email});
            navigate('/LogIn');
        } catch (error) {
            alert(`Signup failed`);


        }

    }

    return (
        <div className="app-container">
            <Header />
            <div id="login_container">
                <div id="login_box">
                    <h1>Criar Conta</h1>
                    <p>Ainda não tens conta? <strong>Bem vindo!</strong></p>

                    <form id="logIn_form" onSubmit={submitHandler}>
                        <label id="user_label">Nome de <strong>Usuário</strong></label>
                        <input id="input_user" type="text" value={username} onChange={(e)=> setUsername(e.target.value)}></input>
                        <label id="email_label">Email</label>
                        <input id="input_email" type="text" value={email} onChange={(e)=> setEmail(e.target.value)}></input>
                        <label id="pass_label">Palavra-Passe</label>
                        <input id="input_pass" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>

                        

                        <button
                            id="LogIn_Button"
                            type="submit"
                        >
                            Criar
                        </button>
                                                
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LogIn;