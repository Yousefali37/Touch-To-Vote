import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PositionVotingCard from './../../../../Components/Cards/Voting-cards/Position-voting-card/PositionVotingCard';
import Verifyfingerprint from './../../../../Components/Verify-Fingerprint/Verifyfingerprint';
import HeroSection2 from "../../../../Components/Hero Section 2/HeroSection2";
import './PositionSession.css';
import GoBackBtn from "../../../../Components/Go Back btn/GoBackBtn";

function PositionSession() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [userId, setUserId] = useState("");
    const [showVerify, setShowVerify] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserId = localStorage.getItem("user_id");
        if (storedUserId) setUserId(storedUserId);

        axios
            .get(`http://127.0.0.1:8000/api/candidates`)
            .then((res) => setData(res.data))
            .catch((err) => console.error("Error fetching candidates:", err));

        if (userId && id) {
            axios
                .get(`http://127.0.0.1:8000/api/votes/check?user_id=${userId}&election_id=${id}`)
                .then((res) => {
                    if (res.data.voted) {
                        setHasVoted(true);
                        toast.info("You have already voted in this session.");
                    }
                })
                .catch((err) => console.error("Error checking vote:", err));
        }
    }, [id, userId]);

    const filterData = data.filter((item) => item.election_id != null && item.election_id == id);

    const handleVoteFor = (id) => {
        if (hasVoted) {
            toast.info("You cannot vote again in this session.");
            return;
        }
        setSelectedCard(id);
    };

    const handleSubmit = () => {
        if (!userId) {
            toast.error("Please log in first.");
            return;
        }
        if (!selectedCard) {
            toast.error("Please select a candidate first.");
            return;
        }
        if (hasVoted) {
            toast.info("You have already voted in this session.");
            return;
        }
        setShowVerify(true);
    };

    const handleVerifySuccess = (verifiedUserId, fingerprint) => {
        if (!verifiedUserId || !selectedCard) return;

        axios
            .post("http://127.0.0.1:8000/api/votes/candidate", {
                election_id: id,
                user_id: verifiedUserId,
                candidate_id: selectedCard,
                fingerprint: fingerprint,
            })
            .then((response) => {
                toast.success(response.data.message);
                setShowVerify(false);
                setSelectedCard(null);
                setHasVoted(true);
                navigate("/position-sessions");
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || "Failed to vote");
                setShowVerify(false);
            });
    };

    return (
        <div className="position-session">
            <GoBackBtn to={'/Position-Sessions'} />
            <HeroSection2
                title={filterData.slice(0, 1).map((e) => {
                    return (
                        e.election.name
                    )
                })}
                text="Cast your vote for the position"
            />
            <hr />

            {
                showVerify ? (
                    <Verifyfingerprint
                        page="vote"
                        onSuccess={handleVerifySuccess}
                        onBack={() => setShowVerify(false)}
                    />
                ) : (
                    <div className="position-session__container">
                        {data.length === 0 ? (
                            <h2 className="position-session__empty-message">No positions available yet.</h2>
                        ) : (
                            <div className="position-session__grid">
                                {filterData.map((data) => (
                                    <div className="position-session__item" key={data.candidate_id}>
                                        <PositionVotingCard
                                            name={data.name}
                                            id={data.candidate_id}
                                            bio={data.bio}
                                            position={data.election.name}
                                            onVoteFor={handleVoteFor}
                                            isSelected={selectedCard === data.candidate_id}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {filterData.length > 0 && (
                            <div className="position-session__actions">
                                <button
                                    className="position-session__submit-button"
                                    onClick={handleSubmit}
                                    disabled={hasVoted}
                                >
                                    Submit Vote
                                </button>
                            </div>
                        )}
                    </div>
                )
            }

        </div>
    );
}

export default PositionSession;