import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useParams } from 'react-router-dom';

function Header() {
    const location = useLocation();
    const { nome } = useParams();
    const navigate = useNavigate();

    const isGruposPage = location.pathname === '/grupos';
    const isGrupoPage = location.pathname.startsWith('/Grupo');

    const [totalCervejas, setTotalCervejas] = useState(null);
    const isLoggedIn = !!localStorage.getItem('access');

    useEffect(() => {
        if (isLoggedIn) {
            fetch('http://localhost:8000/beer_budies/api/user/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                setTotalCervejas(data.total_bebidas || 0);
            })
            .catch(() => setTotalCervejas(0));
        }
    }, [isLoggedIn]);

    return (
        <div>
            <header className="header">
                {isGrupoPage ? (
                    <div>
                        <h1>Bem-vindo ao {nome}!</h1>
                    </div>
                ) : isGruposPage ? (
                    <div>
                        <h1>Bem-vindo aos Grupos!</h1>
                    </div>
                ) : (
                    <div>
                        {isLoggedIn ? (
                            <h1>Este mês já bebeste: <br/>
                                <span className='cervejas-numero'>{totalCervejas}</span></h1>
                        ) : (
                            <>
                                <h1>Este mês já bebeste:</h1>
                                <button
                                    className="button-74"
                                    role="button"
                                    onClick={() => navigate('/LogIn')}
                                >
                                    Começa a contar!
                                </button>
                            </>
                        )}
                    </div>
                )}
            </header>

            <nav className="sticky navbar">
                <div className="brand display__logo">
                    <Link to="/" className="nav__link">🍺</Link>
                </div>

                <input type="checkbox" id="nav" className="hidden" />
                <div className="nav">
                    <ul className="nav__items">
                        <li className="nav__item"><Link to="/" className="nav__link">Home</Link></li>
                        <li className="nav__item"><Link to="/grupos" className="nav__link">Grupos</Link></li>
                        <li className="nav__item"><Link to="/PerfilEstatisticas" className="nav__link">Estatísticas</Link></li>
                        <li className="nav__item"><Link to="/LogInPage" className="nav__link">Login</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Header;
