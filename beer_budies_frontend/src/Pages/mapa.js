//para correr o mapa é necessário fazer "c" e "npm install leaflet.markercluster"
//localStorage.setItem('token', 'fake-token'); // Simula o login do utilizador
//localStorage.removeItem('token'); // Simula o logout do utilizador
//localStorage.clear(); // Limpa o localStorage

import React, { useEffect, useState, useRef } from 'react';
import '../cssFiles/mapa.css';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';

function Mapa({ onBebidaAdicionada }) {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        local: '',
        evento: '',
        cervejas: '',
        coordenadas: ''
    });

    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access'));
    const mapRef = useRef(null);
    const coordenadasInputRef = useRef(null);
    const markersRef = useRef([]);

    const customIcon = L.icon({
        iconUrl: require('../Icons/PINGbeer.png'),
        iconSize: [38, 38],
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setIsLoggedIn(!!localStorage.getItem('access'));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let map = mapRef.current;
        if (!map) {
            map = L.map("map").setView([38.75441377685015, -9.152601469815817], 13);
            mapRef.current = map;
            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
            }).addTo(map);
        }
    }, []);

    useEffect(() => {
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!mapRef.current) return;

        const handleMapClick = function(e) {
            const coords = `${e.latlng.lat},${e.latlng.lng}`;
            setFormData((f) => ({ ...f, coordenadas: coords }));
            setShowForm(true);
            setTimeout(() => {
                if (coordenadasInputRef.current) {
                    coordenadasInputRef.current.focus();
                }
            }, 100);
        };

        mapRef.current.on('click', handleMapClick);

        return () => {
            if (mapRef.current) {
                mapRef.current.off('click', handleMapClick);
            }
        };
    }, []);

    // Função para limpar todos os marcadores do mapa
    const clearMarkers = () => {
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];
    };

    useEffect(() => {
        if (
            isLoggedIn &&
            mapRef.current
        ) {
            clearMarkers();
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
                            const marker = L.marker([lat, lng], {icon: customIcon})
                                .bindPopup(`<h3>${bebida.evento || 'Evento'}</h3><p>${bebida.local || ''}</p>`);
                            marker.addTo(mapRef.current);
                            markersRef.current.push(marker);
                        }
                    });
                }
            });
        } else {
            clearMarkers();
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
            if (onBebidaAdicionada) onBebidaAdicionada();

            // Atualiza os pinpoints no mapa
            if (isLoggedIn && mapRef.current) {
                clearMarkers();
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
                                const marker = L.marker([lat, lng], {icon: customIcon})
                                    .bindPopup(`<h3>${bebida.evento || 'Evento'}</h3><p>${bebida.local || ''}</p>`);
                                marker.addTo(mapRef.current);
                                markersRef.current.push(marker);
                            }
                        });
                    }
                });
            }
        } else {
            alert('Erro ao registar bebida.');
        }
    };

    return (
        <div className="map-container">
            <h1></h1>
            <div className="map-wrapper">
                <div id="map"></div>
            </div>

            {isLoggedIn && (
                <div className="button-container">
                    <button
                        className="button-mapa"
                        onClick={() => setShowForm(v => !v)}
                    >
                        {showForm ? "Fechar formulário" : "Diz-me onde e quando!"}
                    </button>
                </div>
            )}

            <div className={`slide-form-container${showForm && isLoggedIn ? " open" : ""}`}>
                <form className="evento-form" onSubmit={handleSubmit}>
                    <label>
                        Onde bebeste?*
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
                        Quantas cervejas bebeste?*
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
                        Coordenadas (lat,lng)*:
                    </label>
                    <button className='geobutton'
                        type="button"
                        onClick={() => {
                            if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(
                                    (pos) => {
                                        const coords = `${pos.coords.latitude},${pos.coords.longitude}`;
                                        setFormData((f) => ({ ...f, coordenadas: coords }));
                                        if (coordenadasInputRef.current) {
                                            coordenadasInputRef.current.focus();
                                        }
                                    },
                                    () => alert("Não foi possível obter a localização.")
                                );
                            } else {
                                alert("Geolocalização não suportada.");
                            }
                        }}
                    >
                        Usar a minha localização
                    </button>
                    <input
                        type="text"
                        name="coordenadas"
                        value={formData.coordenadas}
                        onChange={handleChange}
                        placeholder="Ex: 38.7544,-9.1526"
                        required
                        ref={coordenadasInputRef}
                    />
                    <button type="submit" className='submit-button'>Enviar</button>
                </form>
            </div>

            {!isLoggedIn && (
                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                    <p>Faz login para meteres onde andaste a beber!</p>
                </div>
            )}
        </div>
    );
}

export default Mapa;
