import './OurMission.css';
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function OurMission() {
    return (
        <div className="ourmission-card">
            <FontAwesomeIcon icon={faBookOpen} className='mission-icon' />
            <h4 className='mb-1'>Our Mission</h4>
            <p>
                We&apos;re committed to revolutionizing democratic participation through technology.
                Our platform enables transparent, secure, and accessible voting processes for all.
                By leveraging blockchain technology, we aim to empower citizens, enhance trust.
            </p>
        </div>
    );
}

export default OurMission;