/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import "./PositionVotingCard.css";
import cvsData from '../../../../Mockup Data/MockupCv.json';

function PositionVotingCard({ id, name, position, isSelected, onVoteFor, bio, cvUrl }) {
    const [input, setInput] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const storedUserId = localStorage.getItem("user_id");
        if (storedUserId) setUserId(storedUserId);
    }, []);

    const handleVoteFor = () => {
        if (onVoteFor) {
            onVoteFor(id);
        } else {
            console.error('onVoteFor is not defined');
        }
    };

    const cvFilter = cvsData.filter((e) => {
        const cvID = e.id ? e.id === id : true
        return cvID;
    })

    const cvLink = cvFilter.map((e) => {
        return e.link;
    })

    const cvImage = cvFilter.map((e) => {
        return e.img;
    })

    return (
        <div className={`position-voting-card position-voting-card--${isSelected ? "selected" : "not-selected"}`}>
            <div className="position-voting-card__header">
                <div className="position-voting-card__info">
                    <div className="d-flex align-items-center gap-2">
                        <img src={cvImage} alt="Candidate" loading="lazy" className="position-voting-img rounded-circle profile-pic" />
                        <div>
                            <h3 className="position-voting-card__name">{name}</h3>
                            <p className="position-voting-card__position">{position}</p>
                        </div>
                    </div>
                    {bio && <p className="position-voting-card__bio">{bio}... <a
                        href={cvLink}
                        target="_blank"
                        className="position-voting-card__button--cv"
                        disabled={!cvFilter}
                    >
                        view full cv
                    </a></p>}
                </div>
            </div>

            {input !== "other" ? (
                <div className="position-voting-card__actions">
                    <button
                        className={`position-voting-card__button position-voting-card__button--approve ${isSelected ? "position-voting-card__button--voted" : ""
                            }`}
                        onClick={handleVoteFor}
                    >
                        ✅ Approve
                    </button>
                </div>
            ) : (
                <div className="position-voting-card__abstain-form">
                    <hr className="position-voting-card__divider" />
                    <form
                        className="position-voting-card__form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            setInput("");
                        }}
                    >
                        <button
                            className="position-voting-card__close-button"
                            onClick={() => setInput("")}
                            type="button"
                        >
                            ×
                        </button>
                        <label htmlFor="reason" className="position-voting-card__form-label">
                            Reason to Abstain
                        </label>
                        <input
                            type="text"
                            className="position-voting-card__form-input"
                            id="reason"
                            placeholder="Write your reason here..."
                            required
                            minLength={1}
                        />
                        <button type="submit" className="position-voting-card__submit-button">
                            Save
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

PositionVotingCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onVoteFor: PropTypes.func.isRequired,
    bio: PropTypes.string,
    cvUrl: PropTypes.string // New prop for CV URL
};

export default PositionVotingCard;