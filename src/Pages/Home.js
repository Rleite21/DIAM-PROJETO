import React from 'react';
import Header from '../Header/Header';
import Calculadora from './Calculadora';
import Mapa from './mapa'; 
import Footer from './Footer';
import ProximosEventos from './ProximosEventos';

const Home = () => {

  return (
    <div className='app-container' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <div style={{ width: '250px', minWidth: '180px', fontSize: '0.85em' }}>
          <ProximosEventos />
        </div>
        <div style={{ flex: 1 }}>
          <Mapa /> 
        </div>
      </div>
      <Calculadora />
      <Footer />
    </div>
  );
};

export default Home;
