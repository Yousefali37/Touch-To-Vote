import { DatePicker } from "@mui/x-date-pickers";
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
        start_date: null,
        end_date: null,
        status: "",
        manager_id: ""
    });
    const [managers, setManagers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            axios.get(`http://127.0.0.1:8000/api/elections/${id}`),
            axios.get(`http://127.0.0.1:8000/api/users`)
        ])
            .then(([electionRes, usersRes]) => {
                setElection({
                    name: electionRes.data.name,
                    type: electionRes.data.type,
                    start_date: electionRes.data.start_date ? new Date(electionRes.data.start_date) : null,
                    end_date: electionRes.data.end_date ? new Date(electionRes.data.end_date) : null,
                    status: electionRes.data.status,
                    manager_id: electionRes.data.manager_id
                });
                setManagers(usersRes.data.filter(user => user.role === 'manager'));
                setLoading(false);
            })
            .catch(error => {
                setErrors({ general: "Failed to load data: " + error.message });
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/elections/${id}`, {
                name: election.name,
                type: election.type,
                start_date: election.start_date ? election.start_date.toISOString().split('T')[0] : null,
                end_date: election.end_date ? election.end_date.toISOString().split('T')[0] : null,
                status: election.status,
                manager_id: parseInt(election.manager_id)
            });
            if (response.status === 200) {
                setSuccess("Election updated successfully!");
                setTimeout(() => {
                    navigate("/manage-elections/view-elections");
                }, 1500);
            }
        } catch (error) {
            console.error("Error updating election:", error);
            setErrors({ general: error.response?.data?.message || "Failed to update election. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!election.name.trim()) errors.name = "Election name is required";
        if (!election.type) errors.type = "Election type is required";
        if (!election.start_date) errors.start_date = "Start date is required";
        if (!election.end_date) errors.end_date = "End date is required";
        else if (election.start_date && election.end_date < election.start_date) {
            errors.end_date = "End date must be after start date";
        }
        if (!election.manager_id) errors.manager_id = "Manager is required";

        return errors;
    };

    const handleRadioChange = (e) => {
        const type = e.target.value.toLowerCase();
        setElection(prev => ({ ...prev, type }));
        setErrors(prev => ({ ...prev, type: "" }));
    };

    const handleStatusChange = (status) => {
        setElection(prev => ({ ...prev, status }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setElection(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    if (loading) {
        return <Loading />;
    }

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
                    onChange={handleInputChange}
                    required
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="start_date" className="manage-session__label">Start Date *</label>
                <DatePicker
                    className={`manage-session__datepicker ${errors.start_date ? "error" : ""}`}
                    value={election.start_date}
                    onChange={(newValue) => {
                        setElection(prev => ({ ...prev, start_date: newValue }));
                        setErrors(prev => ({ ...prev, start_date: "", end_date: "" }));
                    }}
                    disablePast
                />
                {errors.start_date && <span className="error-message">{errors.start_date}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="end_date" className="manage-session__label">End Date *</label>
                <DatePicker
                    className={`manage-session__datepicker ${errors.end_date ? "error" : ""}`}
                    value={election.end_date}
                    onChange={(newValue) => {
                        setElection(prev => ({ ...prev, end_date: newValue }));
                        setErrors(prev => ({ ...prev, end_date: "" }));
                    }}
                    minDate={election.start_date}
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
                    onChange={handleRadioChange}
                    required
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
                    <label className={election.status === "active" ? "selected" : ""}>
                        <input
                            type="radio"
                            value="active"
                            checked={election.status === "active"}
                            onChange={() => handleStatusChange("active")}
                        />
                        Active
                    </label>
                    <label className={election.status === "upcoming" ? "selected" : ""}>
                        <input
                            type="radio"
                            value="upcoming"
                            checked={election.status === "upcoming"}
                            onChange={() => handleStatusChange("upcoming")}
                        />
                        Upcoming
                    </label>
                    <label className={election.status === "closed" ? "selected" : ""}>
                        <input
                            type="radio"
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
                    onChange={handleInputChange}
                    required
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

            <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Election"}
            </button>
        </form>
    );
}

export default EditElection;