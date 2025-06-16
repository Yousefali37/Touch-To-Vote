import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Verifyfingerprint.css';

function Verifyfingerprint({ page, onSuccess }) {
    const [currentState, setCurrentState] = useState(1);
    const [user, setUser] = useState(null);
    const [fingerprint, setFingerprint] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = localStorage.getItem('user_id');
                if (!userId && page === "auth") {
                    toast.error('User ID not found. Please log in again.');
                    setTimeout(() => {
                        navigate('/auth');
                    }, 2000);
                    return;
                } else if (userId) {
                    const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}`);
                    setUser(response.data);
                }
            } catch (error) {
                console.error('Error fetching user:', error.response?.data || error.message);
                toast.error(error.response?.data?.message || 'Failed to fetch user data. Please try again.');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        };

        fetchUser();
    }, [navigate, page]);

    const handleStateChange = async (e, newState) => {
        e.preventDefault();

        if (newState === 2) {
            setCurrentState(2);

            if (!user?.user_id) {
                toast.error('User data not found. Please try again.');
                setTimeout(() => {
                    setCurrentState(1);
                }, 2000);
                return;
            }

            if (page === "auth") {
                try {
                    console.log('Sending request with:', {
                        user_id: user?.user_id,
                        role: user?.role || 'voter'
                    });

                    const response = await axios.post('http://localhost:5000/verify', {
                        user_id: user?.user_id,
                        role: user?.role || 'voter'
                    });

                    const data = response.data;
                    console.log('Flask API Response:', data);

                    if (data.success) {
                        setTimeout(() => {
                            setCurrentState(3);
                            toast.success('Fingerprint Verified');
                            setTimeout(() => {
                                navigate('/Voting-Preference');
                                if (onSuccess) {
                                    onSuccess(user);
                                }
                            }, 2000);
                        }, 2000);
                    } else {
                        toast.error(data.message || 'Fingerprint verification failed');
                        setTimeout(() => {
                            setCurrentState(1);
                        }, 2000);
                    }
                } catch (error) {
                    console.error('Error verifying fingerprint:', error.response?.data || error.message);
                    toast.error(error.response?.data?.message || 'Error verifying fingerprint. Please try again.');
                    setTimeout(() => {
                        setCurrentState(1);
                    }, 2000);
                }
            } else if (page === "vote") {
                try {
                    console.log('Sending request with:', {
                        user_id: user?.user_id,
                        role: user?.role || 'voter'
                    });

                    const response = await axios.post('http://localhost:5000/verify', {
                        user_id: user?.user_id,
                        role: user?.role || 'voter'
                    });

                    const data = response.data;
                    console.log('Flask API Response:', data);

                    if (data.success) {
                        const fingerprintData = data.fingerprint;
                        console.log('Fingerprint received:', fingerprintData);
                        setFingerprint(fingerprintData);
                        setTimeout(() => {
                            setCurrentState(3);
                            toast.success('Fingerprint Verified');
                        }, 2000);
                    } else {
                        toast.error(data.message || 'Fingerprint verification failed');
                        setTimeout(() => {
                            setCurrentState(1);
                        }, 2000);
                    }
                } catch (error) {
                    console.error('Error verifying fingerprint:', error.response?.data || error.message);
                    toast.error(error.response?.data?.message || 'Error verifying fingerprint. Please try again.');
                    setTimeout(() => {
                        setCurrentState(1);
                    }, 2000);
                }
            }
        } else if (newState === 3 && page === "vote" && fingerprint) {
            if (onSuccess) {
                console.log('Calling onSuccess with:', { userId: user?.user_id, fingerprint });
                onSuccess(user?.user_id, fingerprint);
            }
        }
    };

    return (
        <div className={`verify-fingerprint ${page === "auth" ? "" : "verify-fingerprint--full-height"}`}>
            <div className="verify-fingerprint__container">
                <div className="verify-fingerprint__content">
                    {/* State 1: Initial prompt */}
                    {currentState === 1 && (
                        <div className="verify-fingerprint__state verify-fingerprint__state--initial">
                            <p className="verify-fingerprint__prompt">Hi {user?.name || 'User'}, {'Please Verify Your Fingerprint'}</p>
                            <div className="verify-fingerprint__image-container">
                                <img
                                    loading="lazy"
                                    src="/State-1.png"
                                    alt={page === "auth" ? "Fingerprint Verification" : "Fingerprint"}
                                    className='verify-fingerprint__image'
                                />
                            </div>
                        </div>
                    )}

                    {/* State 2: Scanning/Verifying animation */}
                    {currentState === 2 && (
                        <div className="verify-fingerprint__state verify-fingerprint__state--scanning">
                            <div className="verify-fingerprint__image-container">
                                <img
                                    loading="lazy"
                                    src="/State-2.svg"
                                    alt={page === "auth" ? "Verifying Fingerprint" : "Fingerprint Scanning"}
                                    className="verify-fingerprint__image verify-fingerprint__image--scanning"
                                />
                                <div className="verify-fingerprint__scanner-line"></div>
                            </div>
                        </div>
                    )}

                    {/* State 3: Success message */}
                    {currentState === 3 && (
                        <div className="verify-fingerprint__state verify-fingerprint__state--success">
                            <h5 className="verify-fingerprint__success-message">You're Good to Go</h5>
                            <div className="verify-fingerprint__image-container">
                                <img
                                    loading="lazy"
                                    src="/State-3.png"
                                    alt={page === "auth" ? "Fingerprint Verified" : "Fingerprint Verified"}
                                    className="verify-fingerprint__image verify-fingerprint__image--success"
                                />
                            </div>
                        </div>
                    )}

                    <button
                        className="verify-fingerprint__button verify-fingerprint__button--primary"
                        onClick={(e) => handleStateChange(e, currentState === 1 ? 2 : 3)}
                        disabled={currentState === 2 || !user}
                    >
                        {currentState === 1 ? "Start Verifying" :
                            currentState === 2 ? "Verifying..." : "Continue"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Verifyfingerprint;