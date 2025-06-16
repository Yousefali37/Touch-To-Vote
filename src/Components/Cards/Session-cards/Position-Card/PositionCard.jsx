import './PositionCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import { useState } from 'react';

function PositionCard({ id, position, desc, startDate, endDate, status }) {
    const navigate = useNavigate();
    const [showFullTitle, setShowFullTitle] = useState(false);
    const maxTitleLength = 10;

    const toggleTitle = () => {
        setShowFullTitle(!showFullTitle);
    };

    const displayTitle = showFullTitle 
        ? position 
        : position.length > maxTitleLength 
            ? `${position.slice(0, maxTitleLength)}...` 
            : position;

    return (
        <div className="position-card position-card--fade-in">
            <div className="position-card__container">
                <div className="position-card__content">
                    {/* Title with Read More */}
                    <h3 className="position-card__title">
                        Position: <span className="position-card__title-value">
                            {displayTitle}
                            {position.length && (
                                <button 
                                    onClick={toggleTitle} 
                                    className="position-card__read-more fs-6"
                                >
                                    {showFullTitle ? ' Show Less' : ' Read More...'}
                                </button>
                            )}
                        </span>
                    </h3>

                    {/* Description */}
                    <p className="position-card__description">
                        {desc}
                    </p>
                </div>

                {/* Duration */}
                <div className="position-card__footer">
                    <FontAwesomeIcon icon={faClock} className="position-card__icon" />
                    <span className="decision-card__duration">"{startDate}" Till "{endDate}"</span>
                </div>

                <hr className="position-card__divider" />

                {/* Buttons */}
                <div className='position-card__actions'>
                    <button
                        className={`position-card__button ${status !== "active" ? "position-card__button--secondary" : "position-card__button--primary"}`}
                        onClick={() => navigate(`/Position-Session/${id}`)}
                        disabled={status !== "active" ? true : false}
                    >
                        Vote Now
                    </button>
                    <button
                        className={`position-card__button ${status === "active" ? "position-card__button--secondary" : "position-card__button--primary"}`}
                        onClick={() => navigate(`/Session-Report/${id}`)}
                        disabled={status === "active" ? true : false}
                    >
                        Session Details
                    </button>
                </div>
            </div>
        </div>
    );
}

PositionCard.propTypes = {
    position: PropTypes.string.isRequired,
    duration: PropTypes.object.isRequired,
    desc: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
};

export default PositionCard;