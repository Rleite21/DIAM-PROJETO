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
      <div style={{ flex: 1 }}>
        <Mapa /> 
      </div>
      <ProximosEventos /> {/* <-- fora do layout principal, fica flutuante */}
      <Calculadora />
      <Footer />
    </div>
  );
};

export default Home;
