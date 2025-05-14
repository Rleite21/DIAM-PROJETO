import React from 'react';

import cardsData from './Cards.json';
import { useNavigate } from 'react-router-dom';

function Cards({ typeId }) {
  const navigate = useNavigate();

  // Filtra os dados com base no tipo passado
  const filtered = cardsData.filter(c => c.id === typeId);

  return (
    <div id="cards">
      {filtered.length > 0 ? (
        filtered.map((c, index) => {
          // Renderiza o grupo (id === 1)
          if (c.id === 1) {
            return (
              <div key={index} id="card" style={{ position: 'relative', marginBottom: '20px' }}>
                <h2 id="titulo">{c.nome}</h2>
                <p id="faculdade">{c.faculdade}</p>
                <div id="info">
                  <p className="nome">📅 <strong>Nome:</strong> {c.nome}</p>
                  <p className="faculdade">🏫 <strong>Faculdade:</strong> {c.faculdade}</p>
                  <p className="num_membros">👤 <strong>Membros:</strong> {c.num_membros}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button style={{ background: 'green', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '20px' }}>
                    Juntar
                  </button>
                  <button
                    onClick={() => navigate(`/Grupo/${c.nome}`)}
                    style={{ background: 'green', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '20px' }}
                  >
                    Abrir
                  </button>
                </div>
              </div>
            );
          }

          // Renderiza o evento (id === 2)
          if (c.id === 2) {
            return (
              <div key={index} id="card" style={{ position: 'relative', marginBottom: '20px' }}>
                <h2 id="titulo">{c.festa}</h2>
                <p id="faculdade">🏫 {c.faculdade}</p>
                <div id="info">
                  <p className="data">📅 <strong>Data:</strong> {c.data}</p>
                  <p className="horario">🕙 <strong>Hora:</strong> {c.hora}</p>
                  <p className="bebidas">🍺 <strong>Jola:</strong> {c.preco_jola}€</p>
                  <p className="bebidas">🍏 <strong>Sidra:</strong> {c.preco_sidra}€</p>
                </div>
              </div>
            );
          }

          return null;
        })
      ) : (
        <p>Nenhum item encontrado para este tipo.</p>
      )}
    </div>
  );
}

export default Cards;
