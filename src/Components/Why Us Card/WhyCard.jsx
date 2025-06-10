import { faBoltLightning, faBullseye, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './WhyCard.css';
import { useState } from 'react';

function WhyCard({ icon, title, desc, color }) {
    const iconMap = {
        faShieldAlt: <FontAwesomeIcon icon={faShieldAlt} className="why-card-icon" />,
        faLightning: <FontAwesomeIcon icon={faBoltLightning} className="why-card-icon" />,
        faBullseye: <FontAwesomeIcon icon={faBullseye} className="why-card-icon" />,
        faUser: <FontAwesomeIcon icon={faUser} className="why-card-icon" />
    };

    const [sliceNumber, setSliceNumber] = useState(50);


    const handleReadMore = () => {
        if (sliceNumber === desc.length) {
            setSliceNumber(50);
        } else {
            setSliceNumber(desc.length);
        }
    }


    return (
        <div className="why-card">
            <div className="why-card-icon-container" style={{
                color: `var(${color})`
            }}>
                {iconMap[icon]}
            </div>
            <p className="why-card-title">{title}</p>
            <p className="why-card-desc">{desc.slice(0, sliceNumber)} <br /> <span className='read-more' onClick={handleReadMore}> read {sliceNumber === 50 ? "more..." : "less"}</span></p>
        </div>
    );
}

export default WhyCard;