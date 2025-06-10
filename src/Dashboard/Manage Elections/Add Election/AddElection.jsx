import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers';

function AddElection() {
    const navigate = useNavigate();
    const [election, setElection] = useState({
        name: "",
        type: "",
        start_date: null,
        end_date: null,
        status: "upcoming",
        manager_id: ""
    });
    const [managers, setManagers] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchManagers = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/users");
                setManagers(response.data.filter(user => user.role === 'manager'));
            } catch (error) {
                console.error("Error fetching managers:", error);
            }
        };
        fetchManagers();
    }, []);

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
            const response = await axios.post("http://127.0.0.1:8000/api/elections", {
                name: election.name,
                type: election.type,
                start_date: election.start_date ? election.start_date.toISOString().split('T')[0] : null,
                end_date: election.end_date ? election.end_date.toISOString().split('T')[0] : null,
                status: election.status,
                manager_id: parseInt(election.manager_id)
            });
            if (response.status === 201) {
                setSuccess("Election created successfully!");
                setTimeout(() => {
                    navigate("/manage-elections/view-elections");
                }, 1500);
            }
        } catch (error) {
            console.error("Error creating election:", error);
            setErrors({ general: error.response?.data?.message || "Failed to create election. Please try again." });
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

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2 className="form-title mb-1 text-center">Add New Election</h2>
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
                <label htmlFor="name">Election Name *</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter election name"
                    value={election.name}
                    onChange={handleInputChange}
                    className={errors.name ? "error" : ""}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="start_date">Start Date *</label>
                <DatePicker
                    className={`datepicker ${errors.start_date ? "error" : ""}`}
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
                <label htmlFor="end_date">End Date *</label>
                <DatePicker
                    className={`datepicker ${errors.end_date ? "error" : ""}`}
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
                <label>Election Type *</label>
                <div className="radio-group">
                    <label className={election.type === "position" ? "selected" : ""}>
                        <input
                            type="radio"
                            value="position"
                            checked={election.type === "position"}
                            onChange={handleRadioChange}
                        />
                        Position
                    </label>
                    <label className={election.type === "decision" ? "selected" : ""}>
                        <input
                            type="radio"
                            value="decision"
                            checked={election.type === "decision"}
                            onChange={handleRadioChange}
                        />
                        Decision
                    </label>
                </div>
                {errors.type && <span className="error-message">{errors.type}</span>}
            </div>

            <div className="form-group">
                <label>Status</label>
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
                <label htmlFor="manager_id">Manager *</label>
                <select
                    name="manager_id"
                    id="manager_id"
                    value={election.manager_id}
                    onChange={handleInputChange}
                    className={errors.manager_id ? "error" : ""}
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

            <div className="form-group">
                <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Election"}
                </button>
            </div>
        </form>
    );
}

export default AddElection;