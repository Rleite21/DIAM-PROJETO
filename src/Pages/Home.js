import React from 'react';
import Header from '../Header/Header';
import Calc_Finos from '../Calc_Finos/Calc_Finos';
import Vol_Req from '../Vol_Req/Vol_Req';
import Cards from '../Cards/Cards';
import Mapa from './mapa'; 

const Home = () => {
  return (
    <div className='app-container'>
      <Header />
      <Mapa /> 
    </div>
  );
};

export default Home;
