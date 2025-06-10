import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";

function AddDecision() {
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        election_id: "",
        title: "",
        description: "",
        category: "",
        duration: ""
    });

    // UI state
    const [elections, setElections] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    // Available categories
    const categories = ["Financial", "Legal", "Strategy", "HR", "Operations"];

    // Fetch elections on mount
    useEffect(() => {
        const fetchElections = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/elections");
                setElections(response.data.filter(election => election.type === 'decision'));
            } catch (error) {
                setError("Failed to load elections. Please try again later.");
                console.error("Error fetching elections:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchElections();
    }, []);

    // Validate form fields
    const validateForm = () => {
        const errors = {};

        if (!formData.election_id) errors.election_id = "Please select an election";
        if (!formData.title.trim()) errors.title = "Title is required";
        if (!formData.description.trim()) errors.description = "Description is required";
        if (!formData.category) errors.category = "Please select a category";
        if (!formData.duration) errors.duration = "Duration is required";

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
            const response = await axios.post('http://127.0.0.1:8000/api/election-decisions', {
                election_id: parseInt(formData.election_id),
                title: formData.title,
                description: formData.description,
                category: formData.category,
                duration: formData.duration
            });

            if (response.status === 201) {
                setSuccess("Decision added successfully!");
                setTimeout(() => {
                    navigate('/manage-decisions/view-decision');
                }, 1500);
            }
        } catch (error) {
            setError(error.response?.data?.message || "Failed to add decision. Please try again.");
            console.error("Error adding decision:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
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
            <h2 className="form-title mb-1 text-center">Add New Decision</h2>
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
                    value={formData.election_id}
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
                    value={formData.title}
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
                    value={formData.description}
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
                    value={formData.category}
                    onChange={handleInputChange}
                    className={validationErrors.category ? "is-invalid" : ""}
                >
                    <option value="">Select a category</option>
                    {categories.map(category => (
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
                    placeholder="Enter duration (e.g., 30 days)"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className={validationErrors.duration ? "is-invalid" : ""}
                />
                {validationErrors.duration && (
                    <div className="invalid-feedback">{validationErrors.duration}</div>
                )}
            </div>

            <button type="submit" className="form-submit-btn mt-3" disabled={loading}>
                <FontAwesomeIcon icon={faPlus} /> {loading ? "Adding..." : "Add Decision"}
            </button>
        </form>
    );
}

export default AddDecision;