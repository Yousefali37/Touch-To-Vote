import './MemberCard.css';
import { PropTypes } from 'prop-types';

function MemberCard({ name, position, initials }) {

    const roleClass = position.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="member-card d-flex flex-column align-items-start gap-3">
            <div className={`initials ${roleClass}`}>
                <p className='m-0'>{initials}</p>
            </div>
            <div className="member-details mt-2">
                <h5 className='fw-bold'>{name}</h5>
                <p className={`member-position ${roleClass}-position`}>{position}</p>
            </div>
        </div>
    )
}

MemberCard.propTypes = {
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    initials: PropTypes.string.isRequired
};

export default MemberCard;