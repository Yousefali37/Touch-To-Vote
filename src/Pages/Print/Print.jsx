import './Print.css';
import electionData from '../../Mockup Data/Print.json';

function Print() {
    return (
        <div className="print">
            <div className="print__header">
                <div className="print__logo">
                    <img loading='lazy' src="/download-removebg-preview.png" alt="Company Logo" className="print__logo-image" width={150} />
                </div>
                <div className='print__badge'>
                    <img loading='lazy' src="/public/image-removebg-preview.png" alt="Election Badge" className="print__badge-image" width={150} />
                </div>
                <div className="print__badge">
                    <img loading='lazy' src="/2.png" alt="Election Badge" className="print__badge-image" width={100} />
                </div>
            </div>
            <div className="print__content">
                {/* Election Details */}
                <h2 className="print__section-title">Election Details</h2>
                <div className="print__detail-item">
                    <strong>Election:</strong> {electionData.election.name}
                </div>
                <div className="print__detail-item">
                    <strong>Date:</strong> {electionData.election.date}
                </div>

                {/* Results */}
                <h2 className="print__section-title">Results</h2>
                {electionData.positions.map((position, index) => (
                    <div key={index} className="print__position">
                        <h3 className="print__position-title">{position.title}</h3>
                        <ul className="print__candidates-list">
                            {position.candidates.map((candidate, cIndex) => (
                                <li
                                    key={cIndex}
                                    className={`print__candidate ${candidate.isWinner ? 'print__candidate--winner' : ''}`}
                                >
                                    {candidate.name}: {candidate.votes} votes
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Admin Info */}
                <h2 className="print__section-title">Administration</h2>
                <div className="print__admin-item">
                    <strong>Certified by:</strong> 
                </div>
                <div className="print__admin-item">
                    <strong>Date issued:</strong> {electionData.election.issuedDate}
                </div>
                <div className="print__admin-item">
                    <strong>Signature:</strong>
                    {/* <img
                        src=''
                        alt="Official Signature"
                        className="print__signature"
                    /> */}
                </div>
            </div>
        </div>
    );
}

export default Print;