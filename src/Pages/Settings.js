import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../cssFiles/Settings.css';
import Header from "../Header/Header";
import Footer from "./Footer";

function Settings() {
    const navigate = useNavigate();
    const location = useLocation();

    const [fields, setFields] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [modal, setModal] = useState(null); // 'username' | 'email' | 'password' | null
    const [inputValue, setInputValue] = useState("");

    const openModal = (field) => {
        setModal(field);
        setInputValue("");
    };

    const closeModal = () => {
        setModal(null);
        setInputValue("");
    };

    const handleSave = () => {
        setFields({ ...fields, [modal]: inputValue });
        closeModal();
        alert("Alteração guardada!");
    };

    return (
        <div className="app-container">
            <Header />
            <h1 className="settings-title">Definições de Utilizador</h1>
            <div className="settings-list">
                <div className="settings-item">
                    <span>Nome de utilizador: <strong>{fields.username || "Não definido"}</strong></span>
                    <button className="settings-edit-btn" onClick={() => openModal("username")}>Alterar</button>
                </div>
                <div className="settings-item">
                    <span>Email: <strong>{fields.email || "Não definido"}</strong></span>
                    <button className="settings-edit-btn" onClick={() => openModal("email")}>Alterar</button>
                </div>
                <div className="settings-item">
                    <span>Password: <strong>{fields.password ? "********" : "Não definida"}</strong></span>
                    <button className="settings-edit-btn" onClick={() => openModal("password")}>Alterar</button>
                </div>
            </div>
            {modal && (
                <div className="settings-modal">
                    <div className="settings-modal-content">
                        <h2>Alterar {modal === "username" ? "nome de utilizador" : modal === "email" ? "email" : "password"}</h2>
                        <input
                            type={modal === "password" ? "password" : "text"}
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            placeholder={`Mudar ${modal === "username" ? "nome de utilizador" : modal}`}
                        />
                        <div className="settings-modal-actions">
                            <button className="settings-save-btn" onClick={handleSave}>Guardar</button>
                            <button className="settings-cancel-btn" onClick={closeModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Settings;