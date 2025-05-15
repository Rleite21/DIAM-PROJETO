import React from 'react';
import Header from '../Header/Header';
import Calc_Finos from '../Calc_Finos/Calc_Finos';
import Vol_Req from '../Vol_Req/Vol_Req';
import Cards from '../Cards/Cards';
import Mapa from './mapa'; 
import Footer from './Footer';
import ProximosEventos from './Eventos';

const Home = () => {

  return (
    <div className='app-container' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Mapa /> 
      <Footer />
      <ProximosEventos />
    </div>
  );
};

export default Home;
