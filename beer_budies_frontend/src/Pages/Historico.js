import React, { useEffect, useState } from "react";
import '../cssFiles/Historico.css';

function Historico({ onAtualizarContador }) {
    const [historico, setHistorico] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const pageSize = 3;

    useEffect(() => {
        fetchHistorico();
    }, []);

    function fetchHistorico() {
        setLoading(true);
        fetch('http://localhost:8000/beer_budies/api/minhas_bebidas/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data)) {
                setHistorico(data.filter(ev => ev.cervejas && ev.cervejas > 0));
            }
            setLoading(false);
        })
        .catch(() => setLoading(false));
    }

    function apagarEvento(id) {
        fetch(`http://localhost:8000/beer_budies/api/apagar_bebida/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setHistorico(historico => historico.filter(ev => ev.id !== id));
                if (onAtualizarContador) onAtualizarContador(); // Atualiza Header e Estatísticas!
            } else {
                alert(data.error || "Erro ao apagar evento.");
            }
        });
    }

    if (loading) return <div className="historico-container">A carregar histórico...</div>;
    if (historico.length === 0) return <div className="historico-container">Sem eventos registados.</div>;

    const paginated = historico.slice(page * pageSize, (page + 1) * pageSize);

    return (
        <div className="historico-container">
            <hr />
            <h2 className="historico-title">Histórico de Eventos</h2>
            <ul className="historico-list">
                {paginated.map((ev, idx) => (
                    <li key={ev.id || idx} className="historico-item">
                        {ev.evento && <div className="historico-evento">{ev.evento}</div>}
                        <div><span className="historico-label">Local:</span> {ev.local || "Desconhecido"}</div>
                        <div><span className="historico-label">Cervejas:</span> {ev.cervejas}</div>
                        {ev.data && (
                            <div>
                                <span className="historico-label">Data:</span> {new Date(ev.data).toLocaleDateString()} {new Date(ev.data).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        )}
                        <div className="historico-coords"><span className="historico-label">Coordenadas:</span> {ev.coordenadas}</div>
                        <button
                            className="historico-apagar"
                            onClick={() => apagarEvento(ev.id)}
                            title="Apagar evento"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24">
                                <path fill="#fff" d="M9 3V4H4V6H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V6H20V4H15V3H9ZM7 6H17V19H7V6ZM9 8V17H11V8H9ZM13 8V17H15V8H13Z"/>
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>
            <div style={{ display: "flex", justifyContent: "center", gap: "1em", marginTop: "1em" }}>
                <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>Anterior</button>
                <button onClick={() => setPage(p => (p + 1 < Math.ceil(historico.length / pageSize) ? p + 1 : p))} disabled={(page + 1) * pageSize >= historico.length}>Próxima</button>
            </div>
        </div>
    );
}

export default Historico;