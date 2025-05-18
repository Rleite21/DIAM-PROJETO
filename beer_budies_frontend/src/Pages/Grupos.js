import React, {useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import Header from '../Header/Header';
import LogIn from './LogIn.js';
import axios from 'axios';
import gruposData from '../Cards/Grupos.json'
import '../cssFiles/Grupos.css';
import CriarGrupo from './CriarGrupo.js';


const Grupos = () => {
  const navigate = useNavigate(); 
  const [grupos, setGrupos] = useState([]);
  const ENDPOINT_URL = 'http://127.0.0.1:8000/beer_budies/api/grupos';
 

  useEffect( () => { axios.get(ENDPOINT_URL).then(response => setGrupos(response.data));
  }, []); 



  return (
    <div className="app-container">
      <Header />
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Grupos Disponíveis</h2>
      <div className="lista-grupos">
        {grupos.map((grupo) => (
          <button
            key={grupo.id}
            className="card card-button"
            onClick={() => navigate('/login')} // Updated to match the correct route
          >
            <h3>{grupo.nome}</h3>
            <p><strong>Nome:</strong> {grupo.nome}</p>
            <p><strong>Descrição:</strong> {grupo.descricao}</p>
          </button>
        ))}
      </div>
      <div className='criarGrupoContainer'>
        <button
            className="CriarGrupoButton"
            onClick={() => navigate('/CriarGrupo')} // Updated to match the correct route
          >Criar Grupo</button>

      </div>

    </div>
  );
};

export default Grupos;