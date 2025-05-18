import React, { useState, useEffect } from "react";
import eventosData from '../PerfilEstatisticas/Evento.json';
import '../cssFiles/ProximosEventos.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ProximosEventos = () => {
  const ENDPOINT_URL = 'http://127.0.0.1:8000/beer_budies/api/eventos/';
  const [eventos,setEventos] = useState([]);
  useEffect( () => { axios.get(ENDPOINT_URL).then(response => setEventos(response.data))}, []); 
  const navigate = useNavigate();



  return (
    <div className="proximos-eventos-tab">
      <div className="proximos-eventos">
        <h2>Próximos Eventos:</h2>
        <ul>
          {eventos.map((evento, index) => (
            <li key={index}>
              {evento.nome}: ({evento.data})

            </li>

          ))}
        </ul>
        <button id="criar_evento_button" onClick={() => navigate('/CriarEvento')}>Criar evento</button>
      </div>
    </div>
  );
};

export default ProximosEventos;