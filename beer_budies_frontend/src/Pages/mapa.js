import React, { useEffect } from 'react';
import '../cssFiles/mapa.css';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Mapa() {
    useEffect(() => {
        if (!L.DomUtil.get('map')._leaflet_id) { 
            const map = L.map("map").setView([38.75441377685015, -9.152601469815817], 13);
            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
            }).addTo(map);

            L.marker([38.74799571383414, -9.153464619121293]).addTo(map);
        }
    }, []); 

    return (
        <div id="map" style={{ height: "100vh", width: "100%" }}>
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
                crossorigin=""
            />
        </div>
    );
}

export default Mapa;
