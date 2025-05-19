import React, { useState, useEffect } from "react";
import '../cssFiles/ProximosEventos.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ProximosEventos = () => {
  const ENDPOINT_URL = 'http://127.0.0.1:8000/beer_budies/api/eventos/';
  const [eventos, setEventos] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(ENDPOINT_URL).then(response => setEventos(response.data));
  }, []);

  return (
    <>
      <button
        id="toggle_eventos_button"
        onClick={() => setOpen(v => !v)}
        style={{ left: open ? 220 : 0 }}
        aria-label="Abrir/Fechar eventos"
      >
        {open ? "⮜" : "⮞"}
      </button>
      <div id="proximos_eventos_slide" className={open ? "open" : ""}>
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
    </>
  );
};

export default ProximosEventos;