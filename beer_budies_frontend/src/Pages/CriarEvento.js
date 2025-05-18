import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../cssFiles/Grupos.css';
import Header from '../Header/Header';

function CriarEvento(){
  const navigate = useNavigate(); 
  const [nomeE, setnomeE] = useState("");
  const [uniE, setuniE] = useState("");
  const [dataE, setdataE] = useState("");
  const [horaE, sethoraE] = useState("");
  const [precoJolaE, setprecoJolaE] = useState("");

  const ENDPOINT_URL = 'http://127.0.0.1:8000/beer_budies/api/eventos/';

  const submitHandler = (e) => {
    e.preventDefault();

    if (!nomeE.trim() || !uniE || !dataE || !horaE || !precoJolaE) {
      document.getElementById("warning_message").innerText="Todos os campos são obrigatórios!";
      return;
    }

    axios.post(ENDPOINT_URL, {
      nome: nomeE,
      uni: uniE,  // ⚠️ obrigatório ID numérico existente
      data: dataE,                 // formato: "2025-05-20"
      hora: `${horaE}:00`,         // formato: "22:00:00"
      preco_J: parseFloat(precoJolaE),
    })
    .then(() => navigate('/'));
  };

  return (
    <div className="app-container">
      <Header />
      <div className='form_container'>
        <h1>Inserir novo Evento</h1>
        <form onSubmit={submitHandler}>
          <label className="form-label">Nome do Evento: </label>
          <input className="form-input" type="text" value={nomeE} onChange={(e) => setnomeE(e.target.value)} />

          <label className="form-label">ID da Universidade: </label>
          <input className="form-input" type="text" value={uniE} onChange={(e) => setuniE(e.target.value)} />

          <label className="form-label">Data: </label>
          <input className="form-input" type="date" value={dataE} onChange={(e) => setdataE(e.target.value)} />

          <label className="form-label">Hora: </label>
          <input className="form-input" type="time" value={horaE} onChange={(e) => sethoraE(e.target.value)} />

          <label className="form-label">Preço Cerveja: </label>
          <input className="form-input" type="number" step="0.01" value={precoJolaE} onChange={(e) => setprecoJolaE(e.target.value)} />€

          <p id="warning_message"></p>
          <br/><br/>
          <input className="form-submit" type="submit" value="Submeter"/>
        </form>
      </div>
    </div>
  );
};

export default CriarEvento;
