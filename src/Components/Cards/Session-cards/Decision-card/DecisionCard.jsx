import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import './DecisionCard.css';

function DecisionCard({ id, desc, duration, status }) {
    const navigate = useNavigate();

    const handleCardClick = () => navigate('/Decision-session');
    const handleVoteClick = (e) => {
        e.stopPropagation();
        navigate(`/Decision-Session/${id}`);
    };
    const handleDetailsClick = (e) => {
        e.stopPropagation();
        navigate(`/Session-Report`);
    };

    return (
        <div className="decision-card decision-card--fade-in">
            <div className="decision-card__container" onClick={handleCardClick}>
                <div className="decision-card__content">
                    {/* Discription */}
                    <h3 className="decision-card__title">{desc}</h3>
                </div>

                {/* Duration */}
                <div className="decision-card__footer">
                    <FontAwesomeIcon icon={faClock} className="decision-card__icon" />
                    <span className="decision-card__duration">Ends in: {duration}</span>
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