import React from 'react';
import eventosData from '../PerfilEstatisticas/Evento.json';
import '../cssFiles/ProximosEventos.css';

const ProximosEventos = () => {
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
    <div className="proximos-eventos-tab">
      <div className="proximos-eventos">
        <h2>Próximos Eventos:</h2>
        <ul>
          {proximosEventos.map((evento, index) => (
            <li key={index}>
              {evento.name}: <span style={{ color: '#222', fontWeight: 'bold', fontSize: '0.95em' }}>({evento.data})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProximosEventos;