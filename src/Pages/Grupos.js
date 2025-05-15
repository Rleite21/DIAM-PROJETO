import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import LogIn from './LogIn.js';
import gruposData from '../Cards/Grupos.json'
import Footer from './Footer.js';
import '../cssFiles/Grupos.css';
import ProximosEventos from './Eventos.js';

const Grupos = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <Header />
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Grupos Disponíveis</h2>
      <div className="lista-grupos">
        {gruposData.map((grupo) => (
          <button
            key={grupo.nome}
            className="card-button"
            onClick={() => navigate('/LogIn')} 
          >
            <h3>{grupo.nome}</h3>
            <p><strong>Faculdade:</strong> {grupo.faculdade}</p>
            <p><strong>Número de Seguidores:</strong> {grupo.num_membros}</p>
          </button>
        ))}
      </div>

      <div>
        <button className="criarGrupo-button" onClick={() => navigate('/createGroup')}>
          Criar Grupo
        </button>
      </div>

      <ProximosEventos />
      <Footer />

    </div>
  );
};

export default Grupos;