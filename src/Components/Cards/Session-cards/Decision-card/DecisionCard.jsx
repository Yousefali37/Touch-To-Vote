import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import './DecisionCard.css';
import { useState } from "react";

function DecisionCard({ id, desc, startDate, endDate, status }) {
    const navigate = useNavigate();
    const [showFullTitle, setShowFullTitle] = useState(false);
    const maxTitleLength = 25;

    const toggleTitle = () => {
        setShowFullTitle(!showFullTitle);
    };

    const displayTitle = showFullTitle
        ? desc
        : desc.length > maxTitleLength
            ? `${desc.slice(0, maxTitleLength)}...`
            : desc;

    const handleVoteClick = (e) => {
        e.stopPropagation();
        navigate(`/Decision-Session/${id}`);
    };
    const handleDetailsClick = (e) => {
        e.stopPropagation();
        navigate(`/Session-Report/${id}`);
    };

    return (
        <div className="decision-card decision-card--fade-in">
            <div className="decision-card__container">
                <div className="decision-card__content">
                    Decision: <span className="position-card__title-value">
                            {displayTitle}
                            {desc.length && (
                                <button 
                                    onClick={toggleTitle}
                                    className="position-card__read-more fs-6"
                                >
                                    {showFullTitle ? ' Show Less' : ' Read More...'}
                                </button>
                            )}
                        </span>
                </div>

                {/* Duration */}
                <div className="decision-card__footer">
                    <FontAwesomeIcon icon={faClock} className="decision-card__icon" />
                    <span className="decision-card__duration">"{startDate}" Till "{endDate}"</span>
                </div>

                <hr className="decision-card__divider" />

                {/* Buttons */}
                <div className="decision-card__actions">
                    <button
                        className={`decision-card__button ${status !== "active" ? "decision-card__button--secondary" : "decision-card__button--primary"}`}
                        onClick={handleVoteClick}
                        disabled={status !== "active" ? true : false}
                    >
                        Vote Now
                    </button>
                    <button
                        className={`decision-card__button ${status === "active" ? "decision-card__button--secondary" : "decision-card__button--primary"}`}
                        onClick={handleDetailsClick}
                        disabled={status === "active" ? true : false}
                    >
                        Session Details
                    </button>
                </div>
            </div>
        </div>
    );
}

DecisionCard.propTypes = {
    title: PropTypes.string.isRequired,
    duration: PropTypes.object.isRequired,
    desc: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired
};

export default DecisionCard;