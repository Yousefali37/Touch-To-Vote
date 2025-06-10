import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from '../../../Components/Loading/Loading';

function EditDecision() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [decisionData, setDecisionData] = useState({
        election_id: "",
        title: "",
        description: "",
        category: "",
        duration: ""
    });
    const [elections, setElections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [validationErrors, setValidationErrors] = useState({});

    // Available categories (removed unused variable)

    useEffect(() => {
        setLoading(true);
        Promise.all([
            axios.get(`http://127.0.0.1:8000/api/election-decisions/${id}`),
            axios.get(`http://127.0.0.1:8000/api/elections`)
        ])
            .then(([decisionRes, electionsRes]) => {
                setDecisionData({
                    election_id: decisionRes.data.election_id,
                    title: decisionRes.data.title,
                    description: decisionRes.data.description,
                    category: decisionRes.data.category,
                    duration: decisionRes.data.duration
                });
                setElections(electionsRes.data.filter(election => election.type === 'decision'));
                setLoading(false);
            })
            .catch(error => {
                setError("Failed to load data: " + error.message);
                setLoading(false);
            });
    }, [id]);

    // Validate form fields
    const validateForm = () => {
        const errors = {};

        if (!decisionData.election_id) errors.election_id = "Please select an election";
        if (!decisionData.title.trim()) errors.title = "Title is required";
        if (!decisionData.description.trim()) errors.description = "Description is required";
        if (!decisionData.category) errors.category = "Please select a category";
        if (!decisionData.duration) errors.duration = "Duration is required";

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/election-decisions/${id}`, {
                election_id: parseInt(decisionData.election_id),
                title: decisionData.title,
                description: decisionData.description,
                category: decisionData.category,
                duration: decisionData.duration
            });

            if (response.status === 200) {
                setSuccess("Decision updated successfully!");
                setTimeout(() => {
                    navigate('/manage-decisions/view-decision');
                }, 1500);
            }
        } catch (error) {
            setError(error.response?.data?.message || "Failed to update decision. Please try again.");
            console.error("Error updating decision:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDecisionData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear validation error when user types
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2 className="form-title mb-1 text-center">Update Decision</h2>
            <hr />

            {/* Status messages */}
            {error && (
                <div className="alert alert-danger fade-in">
                    {error}
                </div>
            )}
            {success && (
                <div className="alert alert-success fade-in">
                    {success}
                </div>
            )}

            {/* Election selection */}
            <div className="form-group">
                <label htmlFor="election_id">Election *</label>
                <select
                    name="election_id"
                    id="election_id"
                    value={decisionData.election_id}
                    onChange={handleInputChange}
                    className={validationErrors.election_id ? "is-invalid" : ""}
                >
                    <option value="">Select an election</option>
                    {elections.map(election => (
                        <option key={election.election_id} value={election.election_id}>
                            #{election.election_id} - {election.name}
                        </option>
                    ))}
                </select>
                {validationErrors.election_id && (
                    <div className="invalid-feedback">{validationErrors.election_id}</div>
                )}
            </div>

            {/* Title */}
            <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter title"
                    value={decisionData.title || ''}
                    onChange={handleInputChange}
                    className={validationErrors.title ? "is-invalid" : ""}
                />
                {validationErrors.title && (
                    <div className="invalid-feedback">{validationErrors.title}</div>
                )}
            </div>

            {/* Description */}
            <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    value={decisionData.description || ''}
                    onChange={handleInputChange}
                    className={validationErrors.description ? "is-invalid" : ""}
                    rows="4"
                />
                {validationErrors.description && (
                    <div className="invalid-feedback">{validationErrors.description}</div>
                )}
            </div>

            {/* Category */}
            <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                    name="category"
                    id="category"
                    value={decisionData.category || ''}
                    onChange={handleInputChange}
                    className={validationErrors.category ? "is-invalid" : ""}
                >
                    <option value="">Select a category</option>
                    {["Financial", "Legal", "Strategy", "HR", "Operations"].map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                {validationErrors.category && (
                    <div className="invalid-feedback">{validationErrors.category}</div>
                )}
            </div>

            {/* Duration */}
            <div className="form-group">
                <label htmlFor="duration">Duration *</label>
                <input
                    type="text"
                    id="duration"
                    name="duration"
                    placeholder="Enter duration (e.g., 1 week)"
                    value={decisionData.duration || ''}
                    onChange={handleInputChange}
                    className={validationErrors.duration ? "is-invalid" : ""}
                />
                {validationErrors.duration && (
                    <div className="invalid-feedback">{validationErrors.duration}</div>
                )}
            </div>

            <button type="submit" className="form-submit-btn mt-3" disabled={loading}>
                {loading ? "Updating..." : "Update Decision"}
            </button>
        </form>
    );
}

export default EditDecision;