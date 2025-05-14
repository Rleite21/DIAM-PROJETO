import React from 'react';
import ReactDOM from 'react-dom/client';
import './Vol_Req.css';
import cerveja from '../Icons/beer.png';

function Vol_Req(){
    return(
        <div id="voluntarios_request">
        <a href="forms.html"><img id="cerveja" src={cerveja}/></a>
        <h2>Queres participar na nossa nova aplicação?</h2>
        <h3><br/><br/> (Clica na cerveja)</h3>
        </div>
    );
}

export default Vol_Req;