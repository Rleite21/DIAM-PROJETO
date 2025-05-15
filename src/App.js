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

function App() {
  return (
    <Router>
      {/* Definição das rotas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Grupos" element={<Grupos />} />
        <Route path="/Grupo/:nome" element={<Grupo />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/PerfilEstatisticas" element={<PerfilEstatisticas id = '0' />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
