import React, {useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../cssFiles/Grupos.css';
import Header from '../Header/Header';
import Grupos from './Grupos';


const CriarGrupo = () => {
  const navigate = useNavigate(); 
  const [nomeG, setnomeG] = useState("");
  const [descG, setdescG] = useState("");
  const ENDPOINT_URL = 'http://127.0.0.1:8000/beer_budies/api/grupos/';

  const submitHandler = (e) => {
     e.preventDefault();
  
    if (descG.trim() === "") {
        document.getElementById("warning_message").innerText="É obrigatório tem descrição!";
        return;
    }
    if (nomeG.trim() === "") {
        document.getElementById("warning_message").innerText="É obrigatório tem nome!";
        return;
    }
    axios.post(ENDPOINT_URL, {"nome": nomeG, "descricao":descG,"num_membros":0}).then();
    navigate('/Grupos')
    }
 




  return (
    
    <div className="app-container">
        <Header />
        <div className='form_container'>
            <h1>Inserir novo grupo</h1>
            <form onSubmit={submitHandler}>
                <label className="form-label">Nome do Grupo: </label>
                <input className="form-input" type="text" value={nomeG} onChange={(e) => setnomeG(e.target.value)}/>
                <br/><br/>
                <label className="form-label">Descrição: </label>
                <textarea className="form-input" id="descricao" value={descG} onChange={(e) => setdescG(e.target.value)} rows={4} style={{resize: 'vertical'}} />
                <p id="warning_message"></p>
                <br/><br/>
                <input className="form-submit" type="submit" value="Submeter"/>
            </form>
        </div>
        
    </div>
  );
};

export default CriarGrupo;