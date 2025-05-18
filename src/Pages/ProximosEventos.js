import React, { useState } from 'react';
import eventosData from '../PerfilEstatisticas/Evento.json';
import '../cssFiles/ProximosEventos.css';

const ProximosEventos = () => {
  const [isOpen, setIsOpen] = useState(false);

  const proximosEventos = eventosData
    .filter(evento => evento.name)
    .sort((a, b) => {
      const parseDate = (str) => {
        const [day, month, year] = str.split('/');
        return new Date(`${year}-${month}-${day}`);
      };
      return parseDate(a.data) - parseDate(b.data);
    });

  return (
    <>
      <button
        id="toggle_eventos_button"
        onClick={() => setIsOpen(!isOpen)}
        title="Próximos Eventos"
      >
        {isOpen ? "⮜" : "📅"}
      </button>
      <div
        id="proximos_eventos_container"
        className={isOpen ? "open" : ""}
      >
        <div className="proximos-eventos">
          <h2 style={{ color: "#ffa200" }}>Próximos Eventos:</h2>
          <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
            {proximosEventos.map((evento, index) => (
              <li key={index} style={{ margin: "0.5em 0" }}>
                {evento.name}: <span style={{ color: '#ffa200', fontWeight: 'bold', fontSize: '0.95em' }}>({evento.data})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProximosEventos;