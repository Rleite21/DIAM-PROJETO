import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../cssFiles/LogIn.css';
import Header from "../Header/Header";

function Settings() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="app-container">
            <Header />
        
        </div>
    );
}

export default Settings;