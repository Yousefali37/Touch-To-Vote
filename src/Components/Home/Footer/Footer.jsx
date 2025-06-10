import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__newsletter">
                    <h3 className="title"><span className='title-highlight'>Join the Future of Voting Today!</span></h3>
                    <p className="subtitle">Be part of the democratic revolution. Register now and experience secure, fast, and reliable voting.</p>
                    <button type="submit" className="footer__button">
                        Get Started Now
                    </button>
                    <div className="footer__logo">
                        <p className='footer__logo-text'>Touch To Vote</p>
                        <nav className="header__nav">
                            <ul className="header__nav-list">
                                <li className="header__nav-item">
                                    <a href="#home" className="header__nav-link">Home</a>
                                </li>
                                <li className="header__nav-item">
                                    <a href="#about" className="header__nav-link">About</a>
                                </li>
                                <li className="header__nav-item">
                                    <a href="#services" className="header__nav-link">Services</a>
                                </li>
                                <li className="header__nav-item">
                                    <a href="#whyus" className="header__nav-link">Why Us</a>
                                </li>
                                <li className="header__nav-item">
                                    <a href="#howitworks" className="header__nav-link">How it Works</a>
                                </li>
                                <li className="header__nav-item">
                                    <a href="#contact" className="header__nav-link">Contact</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <p className='footer__copyright'>© 2025 Touch To Vote. All rights reserved. Securing democracy through technology</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;