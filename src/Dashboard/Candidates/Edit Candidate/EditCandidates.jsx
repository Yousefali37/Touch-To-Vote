import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from './../../../Components/Loading/Loading';

function EditCandidates() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [candidateData, setCandidateData] = useState({
        name: "",
        bio: "",
        election_id: 0
    });
    const [elections, setElections] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            axios.get(`http://127.0.0.1:8000/api/candidates/${id}`),
            axios.get(`http://127.0.0.1:8000/api/elections`)
        ])
            .then(([candidateRes, electionsRes]) => {
                setCandidateData({
                    name: candidateRes.data.name,
                    bio: candidateRes.data.bio,
                    election_id: candidateRes.data.election_id
                });
                setElections(electionsRes.data);
            })
            .catch(error => {
                setError("Failed to load data: " + error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!candidateData.name || !candidateData.bio || !candidateData.election_id) {
            setError("Please fill out all the fields");
            return;
        }

        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/candidates/${id}`, {
                name: candidateData.name,
                bio: candidateData.bio,
                election_id: parseInt(candidateData.election_id)
            });
            if (response.status === 200) {
                setSuccess("Candidate updated successfully");
                setTimeout(() => {
                    navigate('/manage-candidates/view-candidates');
                }, 1500);
            }
        } catch (e) {
            setError("Failed to update candidate: " + (e.response?.data?.message || e.message));
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            {error && (
                <p className="form-text fw-bold text-danger mb-3 fade-in">
                    {error}
                </p>
            )}
            {success && (
                <p className="form-text fw-bold text-success mb-3 fade-in">
                    {success}
                </p>
            )}

            <div className="form-group">
                <label htmlFor="name">Candidate Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter candidate name"
                    value={candidateData.name}
                    onChange={(e) => setCandidateData({ ...candidateData, name: e.target.value })}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                    id="bio"
                    name="bio"
                    placeholder="Enter candidate bio"
                    value={candidateData.bio}
                    onChange={(e) => setCandidateData({ ...candidateData, bio: e.target.value })}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="election_id">Election</label>
                <select
                    name="election_id"
                    id="election_id"
                    value={candidateData.election_id}
                    onChange={(e) => setCandidateData({ ...candidateData, election_id: e.target.value })}
                    required
                >
                    <option value="" disabled>Select an election</option>
                    {elections
                        .filter(election => election.type === 'position')
                        .map(election => (
                            <option key={election.election_id} value={election.election_id}>
                                #{election.election_id} - {election.name}
                            </option>
                        ))}
                </select>
            </div>

            <button type="submit" disabled={isLoading} className="form-submit-btn">
                {isLoading ? <Loading /> : "Update Candidate"}
            </button>
        </form>
    );
}

export default EditCandidates;