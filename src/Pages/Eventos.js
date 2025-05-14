import React, { useState } from "react";
import Eventos from "../PerfilEstatisticas/Evento.json";
import "../cssFiles/Eventos.css";

function ProximosEventos() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className={isOpen ? "open" : "closed"} id="toggle_button" onClick={toggleSidebar}>
                <p>⮜</p>
            </button>
            <div id="event_sidebar" className={isOpen ? "open" : "closed"}>
                <h3 id="title_event">Próximos Eventos</h3>
                {Eventos.map((evento, index) => (
                    <p key={index}><strong>{evento.name}: {evento.data}</strong></p>
                ))}
            </div>
        </div>
    );
}

export default ProximosEventos;