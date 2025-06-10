import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "./GoBackBtn.css";

function GoBackBtn({ to }) {
    const navigate = useNavigate();

    const handleGoBack = (to) => {
        navigate(to);
    };

    return (
        <button
            className="back-button back-button--fade-in"
            onClick={() => handleGoBack(to)}
            aria-label="Go back to the previous page"
        >
            <FontAwesomeIcon icon={faArrowLeft} className="back-button__icon" />
        </button>
    );
}

export default GoBackBtn;