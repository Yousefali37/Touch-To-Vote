import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useEffect, useState } from 'react';

function Header({ page }) {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const userId = localStorage.getItem("user_id");

    useEffect(() => {
        setIsAdmin(userId === "1");
    }, [userId]);

    const handleLogOut = () => {
        localStorage.removeItem("user_id");
        navigate('/auth');
    }

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <h1 className="header__title" onClick={() => {
                        navigate('/');
                        window.scrollTo(0, 0);
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
                                    <a href="#faq" className="header__nav-link">Help</a>
                                </li>
                            </ul>
                        ) : (
                            <ul className='header__nav-list'>
                                {isAdmin && (
                                    <li className="header__nav-item">
                                        <Link to={'/Dashboard'} className="header__nav-link">Dashboard</Link>
                                    </li>
                                )}
                                <li className="header__nav-item">
                                    <Link to={'/FAQ'} className="header__nav-link">Help</Link>
                                </li>
                            </ul>
                        )
                    }
                </nav>
                <button
                    className={`hero__button hero__button--primary ${page === "after-login" && "hero__button--primary-logout"}`}
                    onClick={handleLogOut}
                >
                    {page !== "after-login" ? "Get Started" : "Log Out"}
                </button>
            </div>
        </header>
    )
}

export default Header;