import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './mapa.css';
import { useParams } from 'react-router-dom';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';


function Mapa() {
    const map = L.map("map".setview([38.75441377685015, -9.152601469815817], 13)) //cordenadas do centro do mapa, e o zoom
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{
        maxZoom: 19,
        //caso publicassemos o site teriamos de meter, attribution : "dar creditos ao open street map"
    }).addTo(map);

    //adicionar 'pinpoints'
    var marker = L.marker([38.74799571383414, -9.153464619121293]).addTo(map)
    

    return (
        <div id="map">
             <link rel="stylesheet" 
             href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
             integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
              crossorigin=""/>
            //initializing the map

        </div>

         );
}

export default Mapa;
