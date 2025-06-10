/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./DecisionVotingCard.css";

function DecisionVotingCard({ data, onVote }) {
    const [showAbstainForm, setShowAbstainForm] = useState(false);
    const [userId, setUserId] = useState("");
    const [voteChoice, setVoteChoice] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("user_id");
        if (storedUserId) setUserId(storedUserId);
    }, []);

    const handleVoteSelect = (choice) => {
        setVoteChoice(choice);
        if (onVote) {
            onVote(data.election_id, choice);
        }
    };

    const toggleAbstainForm = () => {
        setShowAbstainForm(!showAbstainForm);
    };

    const handleViewDetails = () => {
        if (data.detailsUrl) {
            window.open(data.detailsUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className={`decision-voting-card ${voteChoice ? 'decision-voting-card--selected' : ''}`}>
            <div className="decision-voting-card__header">
                <h2 className="decision-voting-card__title">{data.title}</h2>
                <p className="decision-voting-card__description">{data.description}</p>
            </div>

            {!showAbstainForm ? (
                <div className="decision-voting-card__actions">
                    <button 
                        className="decision-voting-card__button decision-voting-card__button--approve"
                        onClick={() => handleVoteSelect("agree")}
                    >
                        ✅ Approve
                    </button>
                    <button 
                        className="decision-voting-card__button decision-voting-card__button--reject"
                        onClick={() => handleVoteSelect("disagree")}
                    >
                        ❌ Reject
                    </button>
                    <button 
                        className="decision-voting-card__button decision-voting-card__button--abstain"
                        onClick={toggleAbstainForm}
                    >
                        ⚖️ Abstain
                    </button>
                    <button
                        className="decision-voting-card__button decision-voting-card__button--details"
                        onClick={handleViewDetails}
                        disabled={!data.detailsUrl}
                    >
                        📄 View Details
                    </button>
                </div>
            ) : (
                <div className="decision-voting-card__abstain-form">
                    <hr className="decision-voting-card__divider" />
                    <form className="decision-voting-card__form">
                        <button 
                            type="button"
                            className="decision-voting-card__close-button"
                            onClick={toggleAbstainForm}
                            aria-label="Close abstain form"
                        >
                            ×
                        </button>
                        <label htmlFor="reason" className="decision-voting-card__form-label">
                            Reason to Abstain
                        </label>
                        <input 
                            type="text" 
                            className="decision-voting-card__form-input" 
                            id="reason" 
                            placeholder="Write your reason here..." 
                            required 
                            minLength={1} 
                        />
                        <button 
                            type="button"
                            className="decision-voting-card__submit-button"
                            onClick={() => handleVoteSelect("abstain")}
                        >
                            Save
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default DecisionVotingCard;