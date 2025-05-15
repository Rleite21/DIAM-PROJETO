//para correr o mapa é necessário fazer "npm install leaflet" e "npm install leaflet.markercluster"

import React, { useEffect, useState } from 'react';
import '../cssFiles/mapa.css';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';


function Mapa() {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        local: '',
        evento: '',
        cervejas: ''
    });

    useEffect(() => {
        if (!L.DomUtil.get('map')._leaflet_id) { 
            const map = L.map("map").setView([38.75441377685015, -9.152601469815817], 13);
            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
            }).addTo(map);

            const customIcon = L.icon({
                iconUrl: require('../Icons/PINGbeer.png'),
                iconSize: [38, 38],
            });


            const myClusterLayer = L.markerClusterGroup({
                iconCreateFunction: function(cluster) {
                    return L.divIcon({
                        html: '<div class="cluster-div">' + cluster.getChildCount() + '</div>',
                    });
                }
            })
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(
            `Local: ${formData.local}\nEvento: ${formData.evento}\nCervejas: ${formData.cervejas}`
        );
        setShowForm(false);
        setFormData({ local: '', evento: '', cervejas: '' });
    };

    return (
        <div className="map-container">
            <h1>Mapa</h1>
            <div id="map"></div>
            <button onClick={() => setShowForm(true)}>Adicionar Evento</button>
            {showForm && (
                <div className="modal">
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
                                required
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
                        <button type="submit">Enviar</button>
                        <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Mapa;
