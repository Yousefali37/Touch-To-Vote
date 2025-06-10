import './PositionCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";

function PositionCard({ id, position, desc, duration, status }) {
    const navigate = useNavigate();

    return (
        <div className="position-card position-card--fade-in">
            <div className="position-card__container">
                <div className="position-card__content">
                    {/* Title */}
                    <h3 className="position-card__title">
                        Position: <span className="position-card__title-value">{`${position.substring(0, 50)}`}</span>
                    </h3>

                    {/* Description */}
                    <p className="position-card__description">
                        {desc}
                    </p>
                </div>

                {/* Duration */}
                <div className="position-card__footer">
                    <FontAwesomeIcon icon={faClock} className="position-card__icon" />
                    <span className="position-card__duration">Ends in: {duration}</span>
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
                        onClick={() => navigate(`/Session-Report`)}
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