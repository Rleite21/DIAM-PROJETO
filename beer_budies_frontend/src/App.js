import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './Pages/Home';
import Grupos from './Pages/Grupos';
import Grupo from './Pages/Grupo';
import LogIn from './Pages/LogIn'
import Mapa from './Pages/mapa';
import './App.css';
import PerfilEstatisticas from './Pages/PerfilEstatisticas';
import Register from './Pages/Register';
import CriarGrupo from './Pages/criarGrupo';
import ProximosEventos from './Pages/Eventos';
import CriarEvento from './Pages/CriarEvento';
import LogInPage from './Pages/LogInPage';
import Settings from './Pages/Settings';

function App() {
  return (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Grupos" element={<Grupos />} />
            <Route path="/Grupo/:id" element={<Grupo />} />
            <Route path="/LogIn" element={<LogIn />} />
            <Route path="/PerfilEstatisticas" element={<PerfilEstatisticas id = '0' />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/CriarGrupo" element={<CriarGrupo />} />
            <Route path="/CriarEvento" element={<CriarEvento />} />
            <Route path="/LogInPage" element={<LogInPage />} />
            <Route path="/ProximosEventos" element={<ProximosEventos />} />
            <Route path='/settings' element={<Settings />} />
        </Routes>
      </Router>

    
  );
}

export default App;
