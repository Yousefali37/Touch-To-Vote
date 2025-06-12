import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../../Components/Loading/Loading";

function EditElection() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [election, setElection] = useState({
        name: "",
        type: "",
        start_date: "",
        end_date: "",
        status: "upcoming",
        manager_id: ""
    });

    const [managers, setManagers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [electionRes, usersRes] = await Promise.all([
                    axios.get(`http://127.0.0.1:8000/api/elections/${id}`),
                    axios.get(`http://127.0.0.1:8000/api/users`)
                ]);

                const electionData = electionRes.data;
                const formattedStartDate = electionData.start_date 
                    ? new Date(electionData.start_date).toISOString().slice(0, 16)
                    : "";
                const formattedEndDate = electionData.end_date 
                    ? new Date(electionData.end_date).toISOString().slice(0, 16)
                    : "";

                setElection({
                    name: electionData.name,
                    type: electionData.type,
                    start_date: formattedStartDate,
                    end_date: formattedEndDate,
                    status: electionData.status || "upcoming",
                    manager_id: electionData.manager_id
                });

                setManagers(usersRes.data.filter(user => user.role === 'manager'));
            } catch (error) {
                console.error("Error fetching data:", error);
                setErrors({ 
                    general: error.response?.data?.message || 
                    "Failed to load election data. Please try again later."
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});
        setSuccess("");

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            const payload = {
                name: election.name.trim(),
                type: election.type,
                start_date: election.start_date ? new Date(election.start_date).toISOString() : null,
                end_date: election.end_date ? new Date(election.end_date).toISOString() : null,
                status: election.status,
                manager_id: parseInt(election.manager_id)
            };

            const response = await axios.put(
                `http://127.0.0.1:8000/api/elections/${id}`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                setSuccess("Election updated successfully!");
                setTimeout(() => navigate("/manage-elections/view-elections"), 1500);
            }
        } catch (error) {
            console.error("Update error:", error);
            const errorMsg = error.response?.data?.message || 
                           error.response?.data?.error || 
                           "Failed to update election. Please try again.";
            setErrors({ general: errorMsg });
        } finally {
            setIsSubmitting(false);
        }
    };

    const validateForm = () => {
        const errors = {};
        const now = new Date();

        if (!election.name.trim()) {
            errors.name = "Election name is required";
        } else if (election.name.trim().length < 3) {
            errors.name = "Name must be at least 3 characters";
        }

        if (!election.type) {
            errors.type = "Election type is required";
        }

        if (!election.start_date) {
            errors.start_date = "Start date is required";
        } else if (new Date(election.start_date) < now) {
            errors.start_date = "Start date cannot be in the past";
        }

        if (!election.end_date) {
            errors.end_date = "End date is required";
        } else if (election.start_date && new Date(election.end_date) <= new Date(election.start_date)) {
            errors.end_date = "End date must be after start date";
        }

        if (!election.manager_id) {
            errors.manager_id = "Manager is required";
        }

        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setElection(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const handleStatusChange = (status) => {
        setElection(prev => ({ ...prev, status }));
    };

    if (loading) return <Loading />;

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2 className="form-title mb-1 text-center">Update Election</h2>
            <hr />

            {errors.general && (
                <div className="alert alert-danger fade-in">
                    {errors.general}
                </div>
            )}
            
            {success && (
                <div className="alert alert-success fade-in">
                    {success}
                </div>
            )}

            <div className="form-group">
                <label htmlFor="name" className="manage-session__label">Election Name *</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className={`manage-session__input ${errors.name ? "error" : ""}`}
                    placeholder="Enter election name"
                    value={election.name}
                    onChange={handleChange}
                    maxLength={100}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="start_date" className="manage-session__label">Start Date *</label>
                <input
                    type="datetime-local"
                    id="start_date"
                    name="start_date"
                    className={`manage-session__datepicker ${errors.start_date ? "error" : ""}`}
                    value={election.start_date}
                    onChange={handleChange}
                    min={new Date().toISOString().slice(0, 16)}
                />
                {errors.start_date && <span className="error-message">{errors.start_date}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="end_date" className="manage-session__label">End Date *</label>
                <input
                    type="datetime-local"
                    id="end_date"
                    name="end_date"
                    className={`manage-session__datepicker ${errors.end_date ? "error" : ""}`}
                    value={election.end_date}
                    onChange={handleChange}
                    min={election.start_date || new Date().toISOString().slice(0, 16)}
                />
                {errors.end_date && <span className="error-message">{errors.end_date}</span>}
            </div>

            <div className="form-group">
                <label className="manage-session__label">Election Type *</label>
                <select
                    name="type"
                    id="type"
                    className={`manage-session__select ${errors.type ? "error" : ""}`}
                    value={election.type}
                    onChange={handleChange}
                >
                    <option value="" disabled>Select election type</option>
                    <option value="position">Position Voting</option>
                    <option value="decision">Decision Voting</option>
                </select>
                {errors.type && <span className="error-message">{errors.type}</span>}
            </div>

            <div className="form-group">
                <label className="manage-session__label">Status</label>
                <div className="radio-group">
                    <label className={`radio-label ${election.status === "active" ? "selected" : ""}`}>
                        <input
                            type="radio"
                            name="status"
                            value="active"
                            checked={election.status === "active"}
                            onChange={() => handleStatusChange("active")}
                        />
                        Active
                    </label>
                    <label className={`radio-label ${election.status === "upcoming" ? "selected" : ""}`}>
                        <input
                            type="radio"
                            name="status"
                            value="upcoming"
                            checked={election.status === "upcoming"}
                            onChange={() => handleStatusChange("upcoming")}
                        />
                        Upcoming
                    </label>
                    <label className={`radio-label ${election.status === "closed" ? "selected" : ""}`}>
                        <input
                            type="radio"
                            name="status"
                            value="closed"
                            checked={election.status === "closed"}
                            onChange={() => handleStatusChange("closed")}
                        />
                        Closed
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="manager_id" className="manage-session__label">Manager *</label>
                <select
                    name="manager_id"
                    id="manager_id"
                    className={`manage-session__select ${errors.manager_id ? "error" : ""}`}
                    value={election.manager_id}
                    onChange={handleChange}
                >
                    <option value="">Select a manager</option>
                    {managers.map(manager => (
                        <option key={manager.user_id} value={manager.user_id}>
                            #{manager.user_id} - {manager.name}
                        </option>
                    ))}
                </select>
                {errors.manager_id && <span className="error-message">{errors.manager_id}</span>}
            </div>

            <button 
                type="submit" 
                className="form-submit-btn" 
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Updating...
                    </>
                ) : "Update Election"}
            </button>
        </form>
    );
}

export default EditElection;