import React, { useState, useEffect } from "react";
import "../cssFiles/Eventos.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function ProximosEventos() {
    const [isOpen, setIsOpen] = useState(false);
    const [eventos,setEventos] = useState([]);
    const ENDPOINT_URL = 'http://127.0.0.1:8000/beer_budies/api/eventos/';

    useEffect( () => { axios.get(ENDPOINT_URL).then(response => setEventos(response.data))}, []); 

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const navigate = useNavigate();

    return (
        <div>
            <button className={isOpen ? "open" : "closed"} id="toggle_button" onClick={toggleSidebar}>
                <p>⮜</p>
            </button>
            <div id="event_sidebar" className={isOpen ? "open" : "closed"}>
                <h3 id="title_event">Próximos Eventos</h3>
                {eventos.map((evento, index) => (
                    <p key={index}><strong>{evento.nome}: {evento.data}</strong></p>
                ))}
                <button id="criar_evento_button" onClick={() => navigate('/CriarEvento')}>Criar evento</button>
            </div>

            
        </div>
    );
}

export default ProximosEventos;