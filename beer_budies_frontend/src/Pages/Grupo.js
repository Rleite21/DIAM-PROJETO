import React from 'react';
import Header from '../Header/Header';
import Cards from '../Cards/Cards';
import cardsData from '../Cards/Cards.json';
import { useParams } from 'react-router-dom';
import Footer from './Footer';
import '../cssFiles/Grupo.css';

const Grupo = () => {
    const { nome } = useParams();

    const grupos = cardsData.filter((item) => item.id === 1);
    const eventos = cardsData.filter((item) => item.id === 2);
    const grupo = grupos.find((g) => g.nome === nome);
    const filteredCards = eventos.filter((card) => card.organizador === nome);  // Aqui estamos pegando os eventos do grupo com o mesmo nome.

    return (
        <div className="app-container">
            <Header />
            <h2 style={{ textAlign: 'center', marginTop: '20px' }}>{nome}</h2>
            <div className="content">
                <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Eventos futuros:</h2>
                {filteredCards.length > 0 ? (
                    // Aqui passamos o array de cards diretamente para o componente Cards
                    <Cards cards={filteredCards} />
                ) : (
                    <p>Nenhum evento planeado no futuro</p>
                )}
            </div>     
            <Footer email={grupo.email} site={grupo.site} rede_social={grupo.rede_social} />   
        </div>
    );
};

export default Grupo;
