import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Cards from '../Cards/Cards';
import Footer from './Footer';
import '../cssFiles/Grupo.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Grupo = () => {
    const { id } = useParams();
    const [membros, setMembros] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [grupo, setGrupo] = useState(null);
    const [isMember, setIsMember] = useState(false);

    useEffect(() => {
        if (!id) return;
        axios.get(`http://localhost:8000/beer_budies/api/grupos/${id}/`).then(res => setGrupo(res.data));
        axios.get(`http://localhost:8000/beer_budies/api/grupos/${id}/membros/`).then(res => {
            setMembros(res.data);
            // Verifica se o user já é membro
            const userId = localStorage.getItem('user_id');
            setIsMember(res.data.some(m => String(m.id) === String(userId)));
        });
        axios.get(`http://localhost:8000/beer_budies/api/eventos/?grupo=${id}`).then(res => setEventos(res.data));
    }, [id]);

    // identifica o user_id(se ainda não existir)
    useEffect(() => {
        if (!localStorage.getItem('user_id')) {
            axios.get('http://localhost:8000/beer_budies/api/user/id/', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('access')}` }
            }).then(res => {
                localStorage.setItem('user_id', res.data.user_id);
            });
        }
    }, []);

    function juntarAoGrupo() {
        axios.post(`http://localhost:8000/beer_budies/api/grupos/${id}/juntar/`, {}, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('access')}` }
        }).then(() => {
            // Atualiza membros após juntar
            axios.get(`http://localhost:8000/beer_budies/api/grupos/${id}/membros/`).then(res => {
                setMembros(res.data);
                setIsMember(true);
            });
            // Atualiza info do grupo (num_membros)
            axios.get(`http://localhost:8000/beer_budies/api/grupos/${id}/`).then(res => setGrupo(res.data));
        }).catch(() => alert("Erro ao juntar ao grupo."));
    }

    return (
        <div className="app-container">
            <Header />
            <h2 style={{ textAlign: 'center', marginTop: '20px' }}>{grupo?.nome}</h2>
            <div style={{ textAlign: 'center', marginBottom: '1em' }}>
                {!isMember && localStorage.getItem('access') && (
                    <button className="juntar-grupo-btn" onClick={juntarAoGrupo}>
                        Juntar ao grupo
                    </button>
                )}
                {isMember && (
                    <span style={{ color: "#4caf50", fontWeight: "bold" }}>Já és membro deste grupo!</span>
                )}
            </div>
            <div className="grupo-layout">
                <div className="membros-coluna">
                    <h3>Membros</h3>
                    <ul>
                        {membros.map(m => (
                            <li key={m.id}>{m.username}</li>
                        ))}
                    </ul>
                </div>
                <div className="eventos-coluna">
                    <h3>Eventos futuros</h3>
                    {eventos.length > 0 ? (
                        <Cards cards={eventos} />
                    ) : (
                        <p>Nenhum evento planeado no futuro</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Grupo;
