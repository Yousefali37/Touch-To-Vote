import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../../../Components/Loading/Loading";
import Verifyfingerprint from "../../../../Components/Verify-Fingerprint/Verifyfingerprint";
import DecisionVotingCard from './../../../../Components/Cards/Voting-cards/Decision-voting-card/DecisionVotingCard';
import './DecisionSession.css';
import HeroSection2 from "../../../../Components/Hero Section 2/HeroSection2";
import GoBackBtn from "../../../../Components/Go Back btn/GoBackBtn";

function DecisionSession() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState("");
    const [showVerify, setShowVerify] = useState(false);
    const [voteDetails, setVoteDetails] = useState({ election_id: null, voteChoice: null });
    const [hasVoted, setHasVoted] = useState(false);
    useEffect(() => {
        const storedUserId = localStorage.getItem("user_id");
        if (storedUserId) setUserId(storedUserId);
        setIsLoading(true);
        axios
            .get(`http://127.0.0.1:8000/api/election-decisions`)
            .then((res) => setData(res.data))
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));

        if (userId && id) {
            axios
                .get(`http://127.0.0.1:8000/api/votes/check?user_id=${userId}&election_id=${id}`)
                .then((res) => {
                    if (res.data.voted) {
                        setHasVoted(true);
                        toast.info("لقد قمت بالتصويت بالفعل في هذا السيشن.");
                    }
                })
                .catch((err) => console.error("Error checking vote:", err));
        }
    }, [id, userId]);

    const filterData = data.filter((item) => item.election_id != null && item.election_id == id);

    if (isLoading) {
        return <Loading />;
    }

    const handleVote = (electionId, voteChoice) => {
        if (hasVoted) {
            toast.info("لا يمكنك التصويت مرة أخرى في هذا السيشن.");
            return;
        }
        setVoteDetails({ election_id: electionId, voteChoice });
        console.log("Vote updated:", { electionId, voteChoice });
    };

    const onClickSubmit = () => {
        if (!userId) {
            toast.error("Please log in first.");
            return;
        }
        if (!voteDetails.election_id || !voteDetails.voteChoice) {
            toast.error("Please select a voting option (Vote For, Vote Against, or Abstain) first.");
            return;
        }
        if (hasVoted) {
            toast.info("لقد قمت بالتصويت بالفعل في هذا السيشن.");
            return;
        }
        setShowVerify(true);
    };

    const handleVerifySuccess = (verifiedUserId, fingerprint) => {
        console.log("handleVerifySuccess called with:", { verifiedUserId, fingerprint });
        if (!verifiedUserId || !voteDetails.election_id) {
            console.log("Missing verifiedUserId or election_id:", { verifiedUserId, electionId: voteDetails.election_id });
            return;
        }
        axios
            .post("http://127.0.0.1:8000/api/votes/decision", {
                election_id: voteDetails.election_id,
                user_id: verifiedUserId,
                decision_vote: voteDetails.voteChoice,
                fingerprint: fingerprint,
            })
            .then((response) => {
                console.log("Vote Saved successfully:", response.data);
                toast.success(response.data.message);
                setShowVerify(false);
                setVoteDetails({ election_id: null, voteChoice: null });
                setHasVoted(true);
                console.log("Navigating to /decision-sessions");
                navigate("/Decision-Sessions");
            })
            .catch((error) => {
                console.error("Error recording vote:", error.response?.data || error.message);
                toast.error(error.response?.data?.message || "Failed to vote");
                setShowVerify(false);
            });
    };

    return (
        <>
            <div className="decision-session">
                <GoBackBtn to={'/Decision-Sessions'} />
                <HeroSection2 title={filterData.slice(0, 1).map((e) => {
                    return (
                        e.election.name
                    )
                })} text={filterData.slice(0, 1).map((e) => {
                    return (
                        e.description
                    )
                })} />
                <hr />
                {filterData.length > 0 ? (
                    showVerify ? (
                        <Verifyfingerprint
                            page="vote"
                            onSuccess={handleVerifySuccess}
                            onBack={() => setShowVerify(false)}
                        />
                    ) : (
                        <div className="decision-session__container">
                            <div className="decision-session__card-wrapper">
                                {filterData.slice(0, 1).map((item, index) => (
                                    <DecisionVotingCard
                                        key={index}
                                        data={item}
                                        onVote={handleVote}
                                    />
                                ))}
                            </div>
                            <div className="decision-session__actions">
                                <button
                                    type="submit"
                                    className="decision-session__submit-button"
                                    onClick={onClickSubmit}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    )
                ) : (
                    <h1 className="decision-session__empty-message">No Decisions Found</h1>
                )}
            </div>
        </>
    );
}

export default DecisionSession;