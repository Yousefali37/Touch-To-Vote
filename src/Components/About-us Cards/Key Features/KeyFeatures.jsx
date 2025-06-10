import './KeyFeatures.css';
import { faCheck, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function KeyFeatures() {
    return (
        <div className="keyfeatures-card">
            <FontAwesomeIcon icon={faCircleExclamation} className='keyfeatures-icon' />
            <h4 className='mb-1'>Key Features</h4>
            <ul className='keyfeatures p-0'>
                <li><span><FontAwesomeIcon icon={faCheck} /></span> Real-time results and analytics</li>
                <li><span><FontAwesomeIcon icon={faCheck} /></span> Mobile-responsive interface</li>
                <li><span><FontAwesomeIcon icon={faCheck} /></span> 24/7 Technical support</li>
            </ul>
        </div>
    );
}

export default KeyFeatures;