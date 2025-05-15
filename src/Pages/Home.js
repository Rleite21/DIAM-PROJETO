import React from 'react';
import Header from '../Header/Header';
import Calculadora from './Calculadora';
import Mapa from './mapa'; 
import Footer from './Footer';
import ProximosEventos from './Eventos';

const Home = () => {

  return (
    <div className='app-container' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Mapa /> 
      <Calculadora />
      <Footer />
    </div>
  );
};

export default Home;
