//para correr o mapa é necessário fazer "c" e "npm install leaflet.markercluster"
//localStorage.setItem('token', 'fake-token'); // Simula o login do utilizador
//localStorage.removeItem('token'); // Simula o logout do utilizador
//localStorage.clear(); // Limpa o localStorage

import React, { useEffect, useState, useRef } from 'react';
import '../cssFiles/mapa.css';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';

function Mapa() {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        local: '',
        evento: '',
        cervejas: '',
        coordenadas: ''
    });

    const isLoggedIn = !!localStorage.getItem('access');
    const mapRef = useRef(null);


    const customIcon = L.icon({
        iconUrl: require('../Icons/PINGbeer.png'),
        iconSize: [38, 38],
    });

    useEffect(() => {
        if (!L.DomUtil.get('map')._leaflet_id) {
            const map = L.map("map").setView([38.75441377685015, -9.152601469815817], 13);
            mapRef.current = map;
            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
            }).addTo(map);

            const myClusterLayer = L.markerClusterGroup({
                iconCreateFunction: function(cluster) {
                    return L.divIcon({
                        html: '<div class="cluster-div">' + cluster.getChildCount() + '</div>',
                    });
                }
            });
            const market1 = L.marker([38.74799571383414, -9.153464619121293], {icon: customIcon}).addTo(map);
            market1.bindPopup("<h3>Arraial da TAISCTE</h3>");
            const market2 = L.marker([38.747293968592224, -9.152703276949321], {icon: customIcon}).addTo(map);
            market2.bindPopup("<h3>Tarde na Wish</h3>");
            const market3 = L.marker([38.75933741650186, -9.154576031520174], {icon: customIcon}).addTo(map);
            market3.bindPopup("<h3>Pós ensaio da Tuna</h3>");

            myClusterLayer.addLayer(market1);
            myClusterLayer.addLayer(market2);
            myClusterLayer.addLayer(market3);

            map.addLayer(myClusterLayer);
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn && mapRef.current) {
            fetch('http://localhost:8000/beer_budies/api/minhas_bebidas/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    data.forEach(bebida => {
                        if (bebida.coordenadas) {
                            const [lat, lng] = bebida.coordenadas.split(',').map(Number);
                            L.marker([lat, lng], {icon: customIcon})
                                .addTo(mapRef.current)
                                .bindPopup(`<h3>${bebida.evento || 'Evento'}</h3><p>${bebida.local || ''}</p>`);
                        }
                    });
                } else {
                    // Mostra erro no console para debug
                    console.error('Resposta inesperada da API:', data);
                }
            });
        }
    }, [isLoggedIn, customIcon]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/beer_budies/api/adicionar_bebida/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            alert('Bebida registada com sucesso!');
            setShowForm(false);
            setFormData({ local: '', evento: '', cervejas: '', coordenadas: '' });
        } else {
            alert('Erro ao registar bebida.');
        }
    };

    return (
        <div className="map-container">
            <h1></h1>
            <div id="map"></div>

            {isLoggedIn && (
                <div className="button-container">
                    <button
                        className="button-mapa"
                        onClick={() => setShowForm(v => !v)}
                    >
                        {showForm ? "Fechar formulário" : "Adicionar Bebida"}
                    </button>
                </div>
            )}

            <div className={`slide-form-container${showForm && isLoggedIn ? " open" : ""}`}>
                <form className="evento-form" onSubmit={handleSubmit}>
                    <label>
                        Onde bebeu?
                        <input
                            type="text"
                            name="local"
                            value={formData.local}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Nome do evento:
                        <input
                            type="text"
                            name="evento"
                            value={formData.evento}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Quantas cervejas bebeu?
                        <input
                            type="number"
                            name="cervejas"
                            value={formData.cervejas}
                            onChange={handleChange}
                            min="1"
                            required
                        />
                    </label>
                    <label>
                        Coordenadas (lat,lng):
                        <input
                            type="text"
                            name="coordenadas"
                            value={formData.coordenadas}
                            onChange={handleChange}
                            placeholder="Ex: 38.7544,-9.1526"
                            required
                        />
                    </label>
                    <button type="submit">Enviar</button>
                </form>
            </div>

            {!isLoggedIn && (
                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                    <p>Faça login para adicionar eventos!</p>
                </div>
            )}
        </div>
    );
}

export default Mapa;
