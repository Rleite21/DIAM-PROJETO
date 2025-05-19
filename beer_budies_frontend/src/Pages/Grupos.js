import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';
import '../cssFiles/Grupos.css';

const Grupos = () => {
  const navigate = useNavigate(); 
  const [grupos, setGrupos] = useState([]);
  const ENDPOINT_URL = 'http://127.0.0.1:8000/beer_budies/api/grupos';
  const isLoggedIn = !!localStorage.getItem('access');

  useEffect(() => {
    if (isLoggedIn) {
      axios.get(ENDPOINT_URL).then(response => setGrupos(response.data));
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="app-container">
        <Header />
        <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Precisas de fazer login para ver os grupos.</h2>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header />
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Grupos Disponíveis</h2>
      <div className="lista-grupos">
        {grupos.map((grupo) => (
          <button
            key={grupo.id}
            className="card card-button"
            onClick={() => navigate(`/Grupo/${grupo.id}`)}
          >
            <h3>{grupo.nome}</h3>
            <p><strong>Membros:</strong> {grupo.num_membros}</p>
            <p><strong>Descrição:</strong> {grupo.descricao}</p>
          </button>
        ))}
      </div>
      <div className='criarGrupoContainer'>
        <button
          className="CriarGrupoButton"
          onClick={() => navigate('/criarGrupo')}
        >Criar Grupo</button>
      </div>
    </div>
  );
};

export default Grupos;