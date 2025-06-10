import './OurValues.css';
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function OurValues() {
    return (
        <div className="ourvalues-card">
            <FontAwesomeIcon icon={faBuilding} className='ourvalues-icon' />
            <h4 className='mb-1'>Our Values</h4>
            <ul className='ourvalues p-0'>
                <li><span>01</span> Transparency in all processes</li>
                <li><span>02</span> Security and data protection</li>
                <li><span>03</span> Accessibility and inclusivity</li>
            </ul>
        </div>
    );
}

export default OurValues;