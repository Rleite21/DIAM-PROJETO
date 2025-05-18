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
        style={{
          position: "fixed",
          bottom: "70px", // just underneath Calculadora's 20px + 40px height + 10px gap
          right: "20px",
          backgroundColor: "#FA9020",
          color: "black",
          border: "2px solid black",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          zIndex: 1100,
          fontSize: "1.5em"
        }}
        title="Próximos Eventos"
      >
        {isOpen ? "⮜" : "📅"}
      </button>
      <div
        id="proximos_eventos_container"
        className={isOpen ? "open" : ""}
        style={{
          backgroundColor: "#323232",
          padding: "15px",
          borderRadius: "15px",
          position: "fixed",
          bottom: "70px",
          right: isOpen ? "70px" : "-400px",
          maxWidth: "300px",
          zIndex: 1000,
          transition: "right 0.3s ease",
          color: "white",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          textAlign: "center"
        }}
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