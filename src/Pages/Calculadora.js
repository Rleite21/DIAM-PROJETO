import React, { useState } from 'react';
import '../cssFiles/Calculadora.css';
import Button from 'react-bootstrap/Button';

let num_finos = 0;

function Calc_Finos() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div id="calculadora_finos_container" className={isOpen ? "open" : ""}>
            <button id="toggle_button" onClick={toggleSidebar}>
                {isOpen ? "⮜" : "⮞"}
            </button>
            <div id="calculadora_finos">
                <h2>Quantas bebidas consegues comprar?</h2>
                <form id="calc_values">
                    <div>
                        <label htmlFor="Dinheiro">Dinheiro</label>
                        <input type="text" id="Dinheiro" />€<br />
                    </div>
                    <div>
                        <label htmlFor="Preco_fin">Preço da Bebida</label>
                        <input type="text" id="Preco_fin" />€
                    </div>
                </form>
                <Button id="calc_button" variant="success" onClick={handle_calc}>
                    Calcular Bebidas
                </Button>
                <div id="result_box">
                    <p id="result_finos"></p>
                </div>
                <p id="emoji-line"></p>
            </div>
        </div>
    );
}

function handle_calc() {
    calcula_finos();
    emoji_line();
}

function calcula_finos() {
    let dinheiro = parseFloat(document.getElementById("Dinheiro").value.replace(',', '.'));
    let preco_fino = parseFloat(document.getElementById("Preco_fin").value.replace(',', '.'));
    num_finos = Math.floor(dinheiro / preco_fino);
    if (isNaN(dinheiro) || isNaN(preco_fino) || preco_fino === 0) {
        document.getElementById("result_finos").innerText = "Introduza um valor válido";
        return;
    }
    if (num_finos === 1) {
        document.getElementById("result_finos").innerText = num_finos + " Jola";
    } else {
        document.getElementById("result_finos").innerText = num_finos + " Jolas";
    }
}

function emoji_line() {
    const emoji = "🍺";
    document.getElementById("emoji-line").innerText = emoji.repeat(num_finos);
}

export default Calc_Finos;