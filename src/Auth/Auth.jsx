/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Auth.css";
// import { useNavigate } from "react-router-dom";
import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Verifyfingerprint from "../Components/Verify-Fingerprint/Verifyfingerprint";

function Auth({ onLoginSuccess }) {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [ID, setID] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (ID.length === 0) {
            setError("");
        } else if (ID.length < 5) {
            setError("ID must be at least 5 characters");
        } else {
            setError("");
        }
    }, [ID]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (error || ID.length < 5) {
            setError("Please enter a valid ID (at least 5 characters)");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/auth/login`, {
                login_id: ID
            });

            if (response.data.success) {
                localStorage.setItem('user_id', response.data.user.user_id);
                if (response.data.user.fingerprint_1 || response.data.user.fingerprint_2 || response.data.user.fingerprint_3) {
                    setStep(2);
                } else {
                    if (typeof onLoginSuccess === 'function') {
                        onLoginSuccess(response.data.user);
                    } else {
                        console.warn("onLoginSuccess is not provided. Proceeding without callback.");
                        navigate('/Voting-Preference');
                    }
                }
            } else {
                setError(response.data.message || "Authentication failed");
            }
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || err.message || "Network error occurred";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth vh-100 d-flex justify-content-center align-items-center">
            <div className={`auth-container ${step === 2 ? "right-panel-active" : ""}`}>
                <>
                    {/* Sign Up Form */}
                    <div className="auth-form-container auth-sign-up-container">
                        <form
                            className="auth-form"
                            onSubmit={handleSubmit}
                        >
                            <Verifyfingerprint
                                page="auth"
                                onSuccess={onLoginSuccess}
                                onBack={() => setStep(1)}
                            />
                        </form>
                    </div>
                    {/* Sign In Form */}
                    <div className="auth-form-container auth-sign-in-container">
                        <form
                            className="auth-form"
                            onSubmit={handleSubmit}
                        >
                            <h3>Sign In</h3>
                            <div className="auth__form-group">
                                <input
                                    type="text"
                                    id="id"
                                    value={ID}
                                    onChange={(e) => {
                                        setID(e.target.value)
                                    }}
                                    placeholder="Please enter your id..."
                                    className="auth-input"
                                    aria-label="ID"
                                />
                                <label htmlFor="id">ID</label>
                            </div>
                            <p className="auth-error">{error}</p>
                            <a href="/#contact" className="auth-link">
                                Forgot your ID?
                            </a>
                            <button
                                className="auth-button"
                                type="submit"
                                disabled={loading || error || ID.length < 5}
                            >
                                {loading ? "verifying..." : "Sign In"}
                            </button>
                        </form>
                    </div>
                </>

                {/* Overlay */}
                <div className="auth-overlay-container">
                    <div className="auth-overlay">
                        <div className="auth-overlay-panel auth-overlay-left">
                            <h1 className="header-text mb-3">Welcome back</h1>
                            <p></p>
                        </div>
                        <div className="auth-overlay-panel auth-overlay-right">
                            <h1 className="header-text mb-3"></h1>
                            <p className="text-shadow-1"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
