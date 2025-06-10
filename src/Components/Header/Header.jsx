import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ page }) {

    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <h1 className="header__title" onClick={() => {
                        navigate('/');
                        scroll(0, 0);
                    }}>Touch To Vote</h1>
                </div>
                <nav className="header__nav">
                    {
                        page !== "after-login" ? (
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
                        ) : (
                            <ul className='header__nav-list'>
                                <li className="header__nav-item">
                                    <Link to={'/Dashboard'} className="header__nav-link">Dashboard</Link>
                                </li>
                            </ul>
                        )
                    }
                </nav>
                <button className={`hero__button hero__button--primary ${page === "after-login" && "hero__button--primary-logout"}`} onClick={() => {
                    navigate('/auth')
                }}>
                    {page !== "after-login" ? "Get Started" : "Log Out"}
                </button>
            </div>
        </header>
    )
}

export default Header;