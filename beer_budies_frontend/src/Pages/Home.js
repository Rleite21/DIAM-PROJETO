import React, { useState } from 'react';
import Header from '../Header/Header';
import Mapa from './mapa';
import ProximosEventos from './ProximosEventos';
import Calculadora from './Calculadora';
import Footer from './Footer';

const Home = () => {
  const [refreshHeader, setRefreshHeader] = useState(0);

  return (
    <div className='app-container' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header refreshTrigger={refreshHeader} />
      <div style={{ flex: 1 }}>
        <Mapa onBebidaAdicionada={() => setRefreshHeader(v => v + 1)} />
      </div>
      <ProximosEventos />
      <Calculadora />
      <Footer />
    </div>
  );
};

export default Home;
