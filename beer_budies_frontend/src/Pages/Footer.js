import React from 'react';
import '../cssFiles/Footer.css';  

const Footer = ({ email, site, rede_social }) => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-links">
                    {email && (
                        <a href={`mailto:${email}`} className="footer-link">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1280px-Gmail_icon_%282020%29.svg.png" alt="email" />
                        </a>
                    )}
                    {site && (
                        <a href={site} target="_blank" rel="noopener noreferrer" className="footer-link">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReEN-uhB6OSwMZTUKqo8v2gfyHjAetjI540Q&s" alt="site" />
                        </a>
                    )}
                    {rede_social && (
                        <a href={rede_social} target="_blank" rel="noopener noreferrer" className="footer-link">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1200px-Instagram_icon.png" alt="rede social" />
                        </a>
                    )}
                </div>
            </div>
        </footer>
    );
};

export default Footer;